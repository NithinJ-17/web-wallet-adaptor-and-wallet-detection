import AppWalletProvider from "./components/AppWalletProvider";
import WalletDetector from './components/WalletDetector';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="centered-content">
        <div className="Headline Title">Wallet Adapter and WALLET DETECTION Using Injected Providers</div>
        <AppWalletProvider>{children}</AppWalletProvider>
        <WalletDetector />
      </body>
    </html>
  );
}
