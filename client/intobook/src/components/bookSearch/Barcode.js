import React, { useEffect, useState } from 'react';
import {Html5QrcodeScanner} from "html5-qrcode";

const Barcode = () => {
  const [scanResult, setScanResult] = useState(null);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 400,
        height: 300,
      },
      fps: 200,
    });
  
    scanner.render(success, error);
  
    function success(result) {
      console.log(result);
  
      scanner.clear();
      setScanResult(result);
    };
  
    function error(err) {
      console.error(err);
    };
  }, []);

  return (
    <div>
      { scanResult ? 
      <div>Success: {scanResult}</div> :
        <div id="reader"></div>
      }
    </div>
  );
};

export default Barcode;