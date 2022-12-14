import { createCookie, redirect } from '@remix-run/node';
import type { User } from '~/features/user';

export const loginCookie = createCookie('login', {
  maxAge: 31_536_000, // one year
});

export type GetUserCookieArgs = {
  failRedirect: string;
  successRedirect: string;
};

export type GetUserCookie = (
  request: Request,
  args?: Partial<GetUserCookieArgs>
) => Promise<User.SessionUser | null>;

export const getUserCookie: GetUserCookie = async (request, args) => {
  const cookieHeader = request.headers.get('Cookie');

  const payload = await loginCookie.parse(cookieHeader);
  console.log(payload);
  if (args?.failRedirect && !payload?.token) throw redirect(args.failRedirect);
  if (args?.successRedirect && payload?.token)
    throw redirect(args.successRedirect);

  return payload;
};
