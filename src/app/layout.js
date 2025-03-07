import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
