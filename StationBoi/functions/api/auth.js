
export async function onRequest({ request, env }) {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return new Response("OAuth credentials are missing.", {
      status: 500
    });
  }

  const state = crypto.randomUUID();
  const url = new URL(request.url);

  const github = new URL(
    "https://github.com/login/oauth/authorize"
  );

  github.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  github.searchParams.set(
    "redirect_uri",
    `${url.origin}/api/callback`
  );
  github.searchParams.set("scope", "public_repo user");
  github.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: github.href,
      "Set-Cookie":
        `decap_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api/callback; Max-Age=600`
    }
  });
}
