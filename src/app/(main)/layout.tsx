// src/app/layout.tsx

import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";



export default function MainLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full antialiased",

            )}
        >
            <body className="min-h-full flex flex-col">

                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}