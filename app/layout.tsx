import Nav from "@/components/Nav";
import { NextAuthProvider } from "@/components/Provider";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container max-w-3xl mx-auto h-[100dvh] max-h-[100dvh] overflow-y-auto">
          <NextAuthProvider>
            <ReactQueryProvider>
              {/* @ts-ignore */}
              <Nav />
              {children}
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </ReactQueryProvider>
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}