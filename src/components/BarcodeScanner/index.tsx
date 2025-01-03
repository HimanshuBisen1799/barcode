import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface BarcodeScannerProps {
  onDetected: (result: string) => void;
  onError?: (error: string) => void;
}

export default function BarcodeScanner({ onDetected, onError }: BarcodeScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: { width: 250, height: 250 },
        fps: 5,
      },
      false
    );

    scannerRef.current.render(
      (result) => {
        onDetected(result);
        if (scannerRef.current) {
          scannerRef.current.clear();
        }
      },
      (error) => {
        if (onError) {
          onError(error);
        }
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [onDetected, onError]);

  return (
    <div className="relative">
      <div id="reader" className="w-full max-w-md mx-auto" />
    </div>
  );
}