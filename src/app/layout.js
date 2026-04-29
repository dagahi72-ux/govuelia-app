import "./globals.css";
import Providers from "./providers";
import { startCron } from "@/lib/cron";

let cronStarted = false;

export default function RootLayout({ children }) {
  if (!cronStarted) {
    startCron();
    cronStarted = true;
  }

  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}