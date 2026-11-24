
function popupResponse(status, content, httpStatus = 200) {
  const safeContent = JSON.stringify(content)
    .replace(/</g, "\\u003c");

  const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        const receiveMessage = (event) => {
          if (!window.opener) return;

          window.opener.postMessage(
            "authorization:github:${status}:${safeContent}",
            event.origin
          );

          window.removeEventListener(
            "message",
            receiveMessage
          );
        };

        window.addEventListener("message", receiveMessage);
        window.opener?.postMessage("authorizing:github", "*");
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
  try {
    const url = new URL(request.url);
    const cookies = request.headers.get("Cookie") || "";

    const stateCookie = cookies
      .split(";")
      .map(v => v.trim())
      .find(v => v.startsWith("decap_oauth_state="));

    const savedState = stateCookie?.split("=")[1];
    const receivedState = url.searchParams.get("state");

    if (!savedState || savedState !== receivedState) {
      return popupResponse("error", {
        message: "Invalid OAuth state. Please try again."
      }, 403);
    }

    const code = url.searchParams.get("code");

    if (!code) {
      return popupResponse("error", {
        message: "GitHub did not return an authorization code."
      }, 400);
    }

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
        message: result.error_description ||
          result.error ||
          "GitHub authentication failed."
      }, 401);
    }

    return popupResponse("success", {
      token: result.access_token,
      provider: "github"
    });

  } catch (error) {
    return popupResponse("error", {
      message: "Authentication failed. Please try again."
    }, 500);
  }
}
