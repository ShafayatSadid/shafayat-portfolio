// src/app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shafayatsadid.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/"], // অ্যাডমিন প্যানেল এবং API ইনডেক্স করা যাবে না
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}