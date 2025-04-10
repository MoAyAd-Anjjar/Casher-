import React, { useEffect, useRef, useState } from "react";
import {
  BrowserMultiFormatReader,
  Result,
  NotFoundException,
} from "@zxing/library";
import { useData } from "../../Provider/DataProvider";
import { toast } from "react-toastify";

const BarcodeScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanResult, setScanResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { ProductList, setScannedProductList, SelectedPage, setScannedResult } =
    useData();
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

  useEffect(() => {
    setScannedResult("");
    if (scanResult && ProductList.length > 0) {
      // Find the product with matching barcode
      const scannedProduct = ProductList.find(
        (product) => product.barcode === scanResult
      );
      if (SelectedPage == 1) {
        if (scannedProduct) {
          setScannedProductList(scannedProduct);
        } else {
          toast.warn(`${scanResult} لا يوجد منتج يحمل هذا الرقم `, {
            style: { color: "#f23838" },
          });
        }
      }
      setScannedResult(scanResult);
    }
  }, [scanResult, ProductList]);

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
      {/* Hidden video element - still needed for scanning */}
      <video
        ref={videoRef}
        style={{ width: 0, height: 0, position: "absolute" }}
      />

      <div className="scanner-controls">
        {!isScanning ? (
          <button
            className="bg-orange-400"
            onClick={startScanning}
            disabled={isScanning}
          >
            قراءة المنتجات
          </button>
        ) : (
          <button
            className="bg-orange-400"
            onClick={stopScanning}
            disabled={!isScanning}
          >
            ايقاف القراءه
          </button>
        )}
      </div>

      {error && (
        <div className="error-message" style={{ color: "red" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
