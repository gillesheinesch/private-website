import Footer from "@/components/Footer";
import Header from "@/components/Header";
import '../styles/globals.css';

export const metadata = {
  title: 'Gilles Heinesch',
  description: 'Personal website of Gilles Heinesch',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="content">
        <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}