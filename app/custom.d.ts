interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isTrust?: boolean;
      providers : any;
      isCoinbaseWallet?: boolean;
      providerMap?: Map<string, any>;
      providers?: Map<string, any>; 
    };
    solana?: {
      isPhantom?: boolean;
    };
    argent?: any;
    backpack?: {
      isBackpack?: boolean;
    };
    BinanceChain?: {
      isBinanceChain?: boolean;
    };
    myEtherWallet?: {
      isMyEtherWallet?: boolean;
    };
    opera?: {
      isOperaWallet?: boolean;
    };
    getKeplr?: () => any;
    [key: string]: any;
  }
  