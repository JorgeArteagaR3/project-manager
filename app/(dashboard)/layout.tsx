import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";
import "@/styles/global.css";
import { ReactNode } from "react";

export default function DashboardRootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <head />

            <body className="h-screen w-screen candy-mesh p-6">
                <GlassPane className="w-full h-full flex items-center justify-center">
                    <Sidebar />
                    {children}
                </GlassPane>
                <div id="modal"></div>
            </body>
        </html>
    );
}
