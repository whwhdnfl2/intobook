import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats, Html5QrcodeScanType } from 'html5-qrcode';

import { styled } from 'styled-components';

const Bar = ({ closeModal }) => {
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
      fps: 150,
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
  return (
    <ModalContent>
      {scanResult ? (
        <div>Success: {scanResult}</div>
      ) : (
        <div id="reader" style={{ width: 280 }}></div>
      )}


    {/* <StyledButton variant="contained" onClick={closeModal}>
      나중에 보기
    </StyledButton> */}
  </ModalContent>
);
};

const ModalContent = styled.div`
  width: 280px;
  min-width: 240px;
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Bar;