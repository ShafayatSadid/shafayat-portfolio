import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    // If there's no session cookie, redirect to login
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If a session cookie exists, allow the request to proceed.
    // The actual role (admin) check will be done in the page/route itself.
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};