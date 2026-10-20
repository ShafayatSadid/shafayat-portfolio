// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
    
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    
    const role = (session?.user as { role?: string })?.role;

    
    if (!session || role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};