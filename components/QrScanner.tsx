
import React, { useEffect, useRef } from 'react';
import { isValidStation } from '../data/stations';

const QrScanner = ({ onScanSuccess, onCancel }) => {
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    // FIX: Cast window to 'any' to access Html5Qrcode, which is loaded from a script tag.
    const scanner = new (window as any).Html5Qrcode('qr-reader');
    scannerRef.current = scanner;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
      // FIX: Cast window to 'any' to access Html5QrcodeScanType.
      supportedScanTypes: [(window as any).Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };

    const handleSuccess = (decodedText) => {
      if (isValidStation(decodedText)) {
        scanner.stop().then(() => {
          onScanSuccess(decodedText);
        }).catch(err => console.error("Failed to stop scanner", err));
      } else {
        // Optional: Add feedback for invalid QR code
        console.warn("Scanned invalid station code:", decodedText);
      }
    };

    const handleError = (error) => {
      // Errors are logged verbosely by the library.
      // We can ignore them to avoid console spam.
    };

    scanner.start({ facingMode: "environment" }, config, handleSuccess, handleError)
      .catch((err) => {
        console.error("Unable to start QR scanner", err);
        // Fallback or error message for the user
      });

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop()
          .catch((err) => {
            console.error("Failed to stop QR scanner on cleanup", err);
          });
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative">
      <div id="qr-reader" className="w-full max-w-md"></div>
       <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent text-center">
        <h1 className="text-white text-lg font-bold">Aponte para o QR Code</h1>
      </div>
      <button
        onClick={onCancel}
        className="absolute bottom-10 bg-white text-purple-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        aria-label="Cancelar escaneamento"
      >
        Cancelar
      </button>
    </div>
  );
};

export default QrScanner;
