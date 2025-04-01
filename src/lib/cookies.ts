import { ENV } from '@/config/env.config';
import { serialize, parse } from 'cookie'

const isProd = ENV.NODE_ENV === 'production';

export function setRefreshTokenCookie(refreshToken: string) {
    return serialize('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60
    })
}

export function clearRefreshToken() {
    return serialize('refreshToken', "", {
        httpOnly: true,
        secure: isProd,
        sameSite: 'strict',
        path: '/',
        expires: new Date(0)
    })
}

export function getRefreshTokenFromCookies(request: Request) {
    const cookies = request.headers.get('cookie') || "";
    const parsedCookies = parse(cookies);
    return parsedCookies?.refreshToken || null;

}