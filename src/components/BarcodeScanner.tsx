import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

interface BarcodeScannerProps {
  onDetected: (result: string) => void;
}

export default function BarcodeScanner({ onDetected }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanning = async () => {
      try {
        // Use navigator.mediaDevices to list video input devices if `listVideoInputDevices` is unavailable
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputDevices = devices.filter(
          (device) => device.kind === 'videoinput'
        );

        if (videoInputDevices.length === 0) {
          throw new Error('No video input devices found');
        }

        const selectedDeviceId = videoInputDevices[0].deviceId;

        await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current!,
          (result) => {
            if (result) {
              onDetected(result.getText());
              setIsScanning(false);
              codeReader.reset(); // Ensure this method exists in the API
            }
          }
        );

        setIsScanning(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    if (!isScanning) {
      startScanning();
    }

    return () => {
      codeReader.reset?.(); // Use optional chaining to avoid calling undefined functions
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [onDetected, isScanning]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full max-w-md mx-auto rounded-lg shadow-lg"
      />
      {isScanning && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white rounded-lg" />
        </div>
      )}
    </div>
  );
}
