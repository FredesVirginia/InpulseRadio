"use client"

import { Providers } from  "../Redux/provider";
import toast, {Toaster} from "react-hot-toast";

import "./globals.css"
export default function RootLayout({children}) {
  return (
    <html lang="en">
        <body >
          
          <Providers>
          <Toaster/>
            {children}
          </Providers>

        </body>
    </html>
  )
}