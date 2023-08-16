import React, { useEffect, useState } from 'react';
import { getBookDetail } from '../../api/searchApi'
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

const Barcode = ({ setShowScanner, setScannedBook, setIsSheetOpen  }) => {
  const [scanResult, setScanResult] = useState(null);
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    if (scanner) {
      scanner.render((result) => {
        console.log(result);
        scanner.clear();
        setScanResult(result);
        setShowScanner(false);
        getBookInfo(result);
        setIsSheetOpen(true);
      });
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner, setShowScanner]);

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
        width: 220,
        height: 100,
      },
      fps: 500,
      // aspectRatio: 0.5,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      // facingMode: "environment",
      facingMode: "user",
      // formatsToSupport: formatsToSupport,
    });

    setScanner(newScanner);

    return () => {
      newScanner.clear();
    };
  }, []);

  const getBookInfo = async (isbn) => {
    try {
      const res = await getBookDetail(isbn);
      const scannedBook = {
        bookId: res.isbn,
        title: res.title,
        author: res.author,
        status: res.status,
        cover: res.cover,
        page: res.page,
        scanResult: isbn
      }
      console.log(scannedBook,6767)
      setScannedBook(scannedBook);
    } catch {
    }
  };

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