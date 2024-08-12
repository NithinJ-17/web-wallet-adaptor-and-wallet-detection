'use client';
import React, { useState } from 'react';

// Function to detect MetaMask
const isMetaMaskProvider = () => window.ethereum && window.ethereum.isMetaMask;

// Function to detect Phantom
const isPhantomProvider = () => window.solana && window.solana.isPhantom;

// Function to detect Trust Wallet
const isTrustWalletProvider = () => window.ethereum && window.ethereum.isTrust;

// Function to detect Coinbase Wallet
const isCoinbaseWalletProvider = () => {
    if (window.ethereum && Array.isArray(window.ethereum.providers)) {
      return window.ethereum.providers.some(provider => provider.isCoinbaseWallet);
    }
    return false;
  };
// Function to detect Argent Wallet
const isArgentWalletProvider = () => window.argent;

// Function to detect Backpack Wallet
const isBackpackWalletProvider = () => window.backpack && window.backpack.isBackpack;

// Function to detect Binance Chain Wallet
const isBinanceChainWalletProvider = () => window.BinanceChain && window.BinanceChain.isBinanceChain;

// Function to detect MyEtherWallet
const isMyEtherWalletProvider = () => window.myEtherWallet && window.myEtherWallet.isMyEtherWallet;

// Function to detect Opera Wallet
const isOperaWalletProvider = () => window.opera && window.opera.isOperaWallet;

// Function to detect Keplr Wallet
const isKeplrWalletProvider = () => window.getKeplr && typeof window.getKeplr === 'function';

// Function to detect known wallet providers
const detectKnownWalletProviders = () => {
  const detectedWallets: string[] = [];
  if (isMetaMaskProvider()) detectedWallets.push('MetaMask');
  if (isPhantomProvider()) detectedWallets.push('Phantom');
  if (isTrustWalletProvider()) detectedWallets.push('Trust Wallet');
  if (isCoinbaseWalletProvider()) detectedWallets.push('Coinbase Wallet');
  if (isArgentWalletProvider()) detectedWallets.push('Argent Wallet');
  if (isBackpackWalletProvider()) detectedWallets.push('Backpack');
  if (isBinanceChainWalletProvider()) detectedWallets.push('Binance Chain Wallet');
  if (isMyEtherWalletProvider()) detectedWallets.push('MyEtherWallet');
  if (isOperaWalletProvider()) detectedWallets.push('Opera Wallet');
  if (isKeplrWalletProvider()) detectedWallets.push('Keplr Wallet');
  return detectedWallets;
};

// Function to check if an object is likely to be a wallet provider
const isLikelyWalletProvider = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) return false;
  const hasRequest = typeof obj.request === 'function';
  const hasConnect = typeof obj.connect === 'function';
  const hasSend = typeof obj.send === 'function';
  const hasProviderMap = obj.hasOwnProperty('providerMap');
  return hasRequest || hasConnect || hasSend || hasProviderMap;
};

// Function to describe a wallet provider
const describeWallet = (wallet: any) => {
  const description: Record<string, any> = {};
  const knownProperties = [
    'providerMap', 'isMetaMask', 'isPhantom', 'request', 'connect', 'send'
  ];
  knownProperties.forEach(prop => {
    if (wallet.hasOwnProperty(prop)) {
      description[prop] = wallet[prop];
    }
  });
  return description;
};

// Function to detect potential wallet providers
const detectInjectedWallets = () => {
  const detectedWallets: { name: string; object: any; description: any }[] = [];
  const globalKeys = Object.keys(window);
  globalKeys.forEach(key => {
    try {
      const globalObject = window[key];
      if (typeof globalObject === 'object' && globalObject !== null) {
        if (isLikelyWalletProvider(globalObject)) {
          const description = describeWallet(globalObject);
          detectedWallets.push({ name: key, object: globalObject, description: description });
        }
      }
    } catch (e) {
      console.warn(`Could not access ${key}:`, e);
    }
  });
  return detectedWallets;
};

// Function to detect Ethereum wallets from window.ethereum
const detectEthereumWallets = () => {
  const detectedWallets: string[] = [];
  if (window.ethereum && window.ethereum.providerMap) {
    const providerMap = window.ethereum.providerMap;
    providerMap.forEach((value: any, key: string) => {
      if (value) {
        if (value.isMetaMask) detectedWallets.push('MetaMask');
        if (value.isPhantom) detectedWallets.push('Phantom');
        if (value.isTrust) detectedWallets.push('Trust Wallet');
        if (value.isCoinbaseWallet) detectedWallets.push('Coinbase Wallet');
        if (value.isArgent) detectedWallets.push('Argent Wallet');
        if (value.isBackpack) detectedWallets.push('Backpack');
        if (value.isBinanceChain) detectedWallets.push('Binance Chain Wallet');
        if (value.isMyEtherWallet) detectedWallets.push('MyEtherWallet');
        if (value.isOperaWallet) detectedWallets.push('Opera Wallet');
        if (value.isKeplr) detectedWallets.push('Keplr Wallet');
      }
    });
  }
  return detectedWallets;
};

// Main component
const WalletDetector: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<'known' | 'generic' | 'ethereum' | null>(null);
  const [walletResults, setWalletResults] = useState<string[]>([]);
  const [walletDetails, setWalletDetails] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false); // New state for toggling wallet details

  const detectWallets = async (method: 'known' | 'generic' | 'ethereum') => {
    let results: string[] = [];
    let details: string[] = [];

    switch (method) {
      case 'known':
        results = detectKnownWalletProviders();
        details = [`Detected ${results.length} known wallet provider(s):`];
        break;
      case 'generic':
        const injectedWallets = detectInjectedWallets();
        results = injectedWallets.map(wallet => wallet.name);
        details = injectedWallets.map(wallet => JSON.stringify(wallet.description, null, 2));
        break;
      case 'ethereum':
        results = detectEthereumWallets();
        details = [`Detected ${results.length} Ethereum wallet provider(s):`];
        break;
      default:
        break;
    }

    setSelectedMethod(method);
    setWalletResults(results);
    setWalletDetails(details);
    setShowDetails(false); // Reset the details view when new detection is run
  };

  return (
    <div className="wallet-detector">
      <button className="wallet-detector-button" onClick={() => detectWallets('known')}>Detect Installed Wallet Providers</button>
      <button className="wallet-detector-button" onClick={() => detectWallets('generic')}>Detect Generic Wallets</button>
      <button className="wallet-detector-button" onClick={() => detectWallets('ethereum')}>Detect Ethereum Wallets</button>
      {selectedMethod && (
        <div className="wallet-detector-results">
          {walletDetails.map((detail, index) => (
            <p key={index}>{detail}</p>
          ))}
          <ul>
            {walletResults.map((wallet, index) => (
              <li key={index}>
                {wallet} 
                {selectedMethod === 'generic' && (
                  <button
                    className="wallet-detector-button"
                    onClick={() => setShowDetails(prev => !prev)}
                  >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                  </button>
                )}
              </li>
            ))}
          </ul>
          {showDetails && walletDetails.length > 0 && (
            <div className="wallet-details">
              <h3>Wallet Details:</h3>
              <pre>{walletDetails.join('\n\n')}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletDetector;
