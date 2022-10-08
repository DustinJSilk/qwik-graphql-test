import { RequestHandler } from '@builder.io/qwik-city';
// import { getAuth } from 'firebase-admin/auth';

/**
 * Adding the Firebase admin SDK breaks the client. Until this is fixed we are
 * returning a mock cookie to test the GQL client auth tokens being forwarded
 * by the server.
 *
 * I've added an issue here: https://github.com/BuilderIO/qwik/issues/1646
 */
export const onPost: RequestHandler<string> = async ({ request, response }) => {
  // // Get the ID token passed and the CSRF token.
  // const body = (await request.json()) as { token: string; csrfToken: string };

  // const { token } = body;

  // // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  // const sessionCookie = await getAuth().createSessionCookie(token, {
  //   expiresIn,
  // });
  const sessionCookie = 'my-fake-cookie';

  response.headers.append(
    'Set-Cookie',
    `session=${sessionCookie}; maxAge=${expiresIn}; httpOnly; Secure; SameSite=Strict`
  );

  return;
};
