//This had some feature that detected PostRobot in a web based wallet page eg, Tiplink ,would liek to analyse that later.
(function() {
    // Function to check if an object is likely to be a wallet provider
    function isLikelyWalletProvider(obj) {
      if (typeof obj !== 'object' || obj === null) return false;
  
      // Common characteristics of wallet providers
      const hasRequest = typeof obj.request === 'function';
      const hasConnect = typeof obj.connect === 'function';
      const hasSend = typeof obj.send === 'function';
      
      return hasRequest || hasConnect || hasSend;
    }
  
    // Function to describe a wallet provider
    function describeWallet(wallet) {
      const description = {};
  
      // List potential properties and methods to identify
      const knownProperties = [
        'providerMap', 'isMetaMask', 'isPhantom', 'request', 'connect', 'send'
      ];
  
      knownProperties.forEach(prop => {
        if (wallet.hasOwnProperty(prop)) {
          description[prop] = wallet[prop];
        }
      });
  
      return description;
    }
  
    // Function to detect and list potential wallet providers
    function detectInjectedWallets() {
      const detectedWallets = [];
      const globalKeys = Object.keys(window);
  
      globalKeys.forEach(key => {
        try {
          const globalObject = window[key];
  
          // Skip if it's not an object or it's null
          if (typeof globalObject !== 'object' || globalObject === null) return;
  
          if (isLikelyWalletProvider(globalObject)) {
            const description = describeWallet(globalObject);
            detectedWallets.push({
              name: key,
              object: globalObject,
              description: description
            });
  
            console.log(`Detected wallet provider: ${key}`);
            console.log('Description:', description);
          }
        } catch (e) {
          // Ignore errors, such as cross-origin issues
          console.warn(`Could not access ${key}:`, e);
        }
      });
  
      return detectedWallets;
    }
  
    // Detect and log potential wallet providers
    const detectedWallets = detectInjectedWallets();
    if (detectedWallets.length > 0) {
      console.log("detected length ",detectedWallets.length)
      console.log('Detected potential wallet providers:');
      detectedWallets.forEach(wallet => {
        console.log(`Name: ${wallet.name}`);
        console.log('Description:', wallet.description);
      });
    } else {
      console.log('No potential wallet providers detected.');
    }
  })(); 