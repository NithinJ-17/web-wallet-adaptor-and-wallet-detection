"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
 
export default function Home() {

const { connection } = useConnection();
const { publicKey } = useWallet();
 
const getAirdropOnClick = async () => {
  try {
    if (!publicKey) {
      throw new Error("Wallet is not Connected");
    }
    const [latestBlockhash, signature] = await Promise.all([
      connection.getLatestBlockhash(),
      connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL),
    ]);
    const sigResult = await connection.confirmTransaction(
      { signature, ...latestBlockhash },
      "confirmed",
    );
    if (sigResult) {
      alert("Airdrop was confirmed!");
    }
  } catch (err) {
    alert("You are Rate limited for Airdrop");
  }
};

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="border hover:border-slate-900 rounded">
        <WalletMultiButton style={{}} />
      </div>
      <div className="border bg-purple-400 hover:border-slate-900 rounded">
        <button onClick = {getAirdropOnClick}>
          This is User.
        </button>
      </div>
    </main>
  );
}