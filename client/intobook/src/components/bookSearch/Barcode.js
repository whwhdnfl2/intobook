import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";

const Barcode = () => {
  const [scanResult, setScanResult] = useState(null);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 150,
      },
      fps: 150,
      aspectRatio: 0.7
    });
  
    scanner.render(success);
  
    function success(result) { 
      console.log(result);
  
      scanner.clear();
      setScanResult(result);
    };
  }, []);

  return (
    <div style={{ width: 300  }}>

      { scanResult ? 
      <div>Success: {scanResult}</div> :
        <div id="reader"></div>
      }
    </div>
  );
};

export default Barcode;