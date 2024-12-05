import type { Metadata } from "next";


import Navbar from "@/modules/spandana/navbar";
import Footer from "@/modules/spandana/footer";


// import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: "Spandana Hospital landing page",
  description: "Spandana Hospital landing page",
};

export default function RootLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {
  const clientId = process.env.GOOGLE_CLIENT_ID || "";
  console.log(clientId);
  return (
    <>
      {/* <GoogleOAuthProvider clientId={clientId}> */}
      <main className="min-h-screen flex flex-col">
       
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </main>
      {/* </GoogleOAuthProvider> */}
     
    </>
  );
}
