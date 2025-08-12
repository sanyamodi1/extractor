// app/layout.tsx
import React from "react";

export const metadata = {
  title: "Next.js Login Demo",
  description: "Basic login example with Next.js app router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
        {children}
      </body>
    </html>
  );
}
