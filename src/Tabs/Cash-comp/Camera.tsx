import React, { useEffect, useRef, useState } from "react";
import {
  BrowserMultiFormatReader,
  Result,
  NotFoundException,
} from "@zxing/library";

const BarcodeScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanResult, setScanResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    // Initialize the reader
    codeReader.current = new BrowserMultiFormatReader();

    return () => {
      // Clean up on unmount
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    if (!codeReader.current || !videoRef.current) return;

    setIsScanning(true);
    setError("");
    setScanResult("");

    try {
      // Get available video inputs
      const videoInputs = await codeReader.current.listVideoInputDevices();

      // Start scanning
      codeReader.current.decodeFromVideoDevice(
        videoInputs[0].deviceId, // Use first available camera
        videoRef.current,
        (result: Result | null, err: Error | null | any) => {
          if (result) {
            setScanResult(result.getText());
          }
          if (err && !(err instanceof NotFoundException)) {
            setError(err.message);
            console.error(err);
          }
        }
      );
    } catch (err) {
      setError("Failed to access camera or scan barcode");
      console.error(err);
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (codeReader.current) {
      codeReader.current.reset();
    }
    setIsScanning(false);
  };

  return (
    <div className="barcode-scanner">
      <h2>Barcode Scanner</h2>

      {/* Hidden video element - still needed for scanning */}
      <video
        ref={videoRef}
        style={{ width: 0, height: 0, position: "absolute" }}
      />

      <div className="scanner-controls">
        {!isScanning ? (
          <button className="bg-red-500" onClick={startScanning} disabled={isScanning}>
            Start Scanning
          </button>
        ) : (
          <button className="bg-red-500" onClick={stopScanning} disabled={!isScanning}>
            Stop Scanning
          </button>
        )}
      </div>

      {scanResult && (
        <div className="scan-result">
          <h3>Scan Result:</h3>
          <p>{scanResult}</p>
        </div>
      )}

      {error && (
        <div className="error-message" style={{ color: "red" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
