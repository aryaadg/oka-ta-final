import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";
import { type NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
 // Update Supabase session first
 const supabaseResponse = await updateSession(request);
 
 // If user accesses /admin route
 if (request.nextUrl.pathname.startsWith("/admin")) {
 // Note: session check logic is usually done in layouts/pages directly,
 // but middleware session update is necessary.
 // We will do actual redirect in admin pages/layouts.
 return supabaseResponse;
 }

 // Handle i18n routing for public pages
 const intlResponse = intlMiddleware(request);
 
 // Combine cookies from supabase session into intlResponse if needed
 // For simplicity, we just return intlResponse for localized routes
 // since Supabase session cookies are already handled in updateSession
 return intlResponse;
}

export const config = {
 // Match only internationalized pathnames and admin
 matcher: ['/', '/(id|en)/:path*', '/admin/:path*']
};
