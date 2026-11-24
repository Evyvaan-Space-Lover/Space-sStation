function popupResponse(status, content, httpStatus = 200) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        const message = ${JSON.stringify(message)};

        const receiveMessage = (event) => {
          if (
            event.data !== "authorizing:github" ||
            event.origin !== window.location.origin ||
            !window.opener
          ) return;

          window.opener.postMessage(message, event.origin);
          window.removeEventListener("message", receiveMessage);

          window.close();
        };

        window.addEventListener("message", receiveMessage);
        window.opener?.postMessage(
          "authorizing:github",
          window.location.origin
        );
      </script>
    </body>
    </html>
  `;

  return new Response(html, {
    status: httpStatus,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Set-Cookie":
        "decap_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api/callback; Max-Age=0"
    }
  });
}

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const cookies = request.headers.get("Cookie") || "";

  const savedState = cookies
    .split(";")
    .map(v => v.trim())
    .find(v => v.startsWith("decap_oauth_state="))
    ?.split("=")[1];

  if (!savedState || savedState !== url.searchParams.get("state")) {
    return popupResponse("error", {
      message: "Invalid OAuth state. Please try again."
    }, 403);
  }

  const code = url.searchParams.get("code");

  if (!code) {
    return popupResponse("error", {
      message: "GitHub authorization code missing."
    }, 400);
  }

  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code
        })
      }
    );

    const result = await response.json();

    if (!response.ok || result.error || !result.access_token) {
      return popupResponse("error", {
        message: result.error_description || "GitHub login failed."
      }, 401);
    }

    return popupResponse("success", {
      token: result.access_token,
      provider: "github"
    });

  } catch {
    return popupResponse("error", {
      message: "Could not contact GitHub."
    }, 500);
  }
}
