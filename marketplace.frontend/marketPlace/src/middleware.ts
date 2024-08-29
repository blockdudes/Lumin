import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const host = req.headers.get('host');
    console.log(host)
    const url = req.nextUrl.clone();
    const subdomain = getValidSubdomain(host);

    const isStaticAsset = url.pathname.startsWith('/_next/') ||
        url.pathname.startsWith('/static/') ||
        /\.(css|js|png|jpg|jpeg|gif|svg|ico|json|xml|woff|woff2|ttf|eot)$/.test(url.pathname);

    const isApiRoute = url.pathname.startsWith('/api/');

    if (isApiRoute) {
        return NextResponse.next();
    }

    if (subdomain && !isStaticAsset) {
        url.pathname = `/${subdomain}${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const getValidSubdomain = (host?: string | null) => {
    let subdomain: string | null = null;
    if (!host && typeof window !== 'undefined') {
        host = window.location.host;
    }
    if (host && host.includes('.')) {
        const candidate = host.split('.')[0];
        if (candidate && !candidate.includes('localhost')) {
            subdomain = candidate;
        }
    }
    return subdomain;
};