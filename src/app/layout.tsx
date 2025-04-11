import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Throughout T.M.T. | Smart Task Management Tool",
  description:
    "Throughout T.M.T. is a powerful and intuitive task management tool designed to boost productivity, streamline team collaboration, and keep your projects on track.",
  icons: {
    icon: "/logo.png", 
  },
  openGraph: {
    title: "Throughout T.M.T. - Task Management Tool",
    description:
      "Organize tasks, collaborate with teams, and improve productivity using Throughout T.M.T.",
    url: "https://throughout-tmt.vercel.app/", 
    siteName: "Throughout T.M.T.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Throughout T.M.T. - Task Management Tool",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Throughout T.M.T.",
    description:
      "Smart task management made easy with Throughout T.M.T. Collaborate, track, and deliver efficiently.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
