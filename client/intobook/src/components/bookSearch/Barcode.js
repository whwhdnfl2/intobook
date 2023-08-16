import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

const Barcode = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    if (scanner) {
      scanner.render((result) => {
        console.log(result);
        scanner.clear();
        setScanResult(result);
      });
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  useEffect(() => {
    // const formatsToSupport = [
    //   Html5QrcodeSupportedFormats.EAN_13,
    //   Html5QrcodeSupportedFormats.EAN_8,
    //   Html5QrcodeSupportedFormats.QR_CODE,
    //   Html5QrcodeSupportedFormats.UPC_A,
    //   Html5QrcodeSupportedFormats.UPC_E,
    //   Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
    // ];

    const newScanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 200,
        height: 150,
      },
      fps: 200,
      // aspectRatio: 0.5,
      // supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      // facingMode: "environment",
      // formatsToSupport: formatsToSupport,
    });

    setScanner(newScanner);

    return () => {
      newScanner.clear();
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
