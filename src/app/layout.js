import "./globals.css";
import Providers from "./providers";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <Script id="travelpayouts-drive" strategy="afterInteractive">
          {`
            (function () {
              var script = document.createElement("script");
              script.async = 1;
              script.src = "https://tp-em.com/NTM1Mjc1.js?t=535275";
              document.head.appendChild(script);
            })();
          `}
        </Script>
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}