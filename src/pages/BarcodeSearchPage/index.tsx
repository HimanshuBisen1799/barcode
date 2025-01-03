import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Camera } from 'lucide-react';
import api from '../../lib/axios';
import BarcodeScanner from '../../components/BarcodeScanner';
import ProductDetails from './ProductDetails';
import { Product } from './types';
import './styles.css';

export default function BarcodeSearchPage() {
  const [barcode, setBarcode] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['product', barcode],
    queryFn: async () => {
      if (!barcode) return null;
      const response = await api.get(`/product/barcode/${barcode}`);
      return response.data;
    },
    enabled: !!barcode,
  });

  const handleBarcodeDetected = (result: string) => {
    setBarcode(result);
    setShowScanner(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Barcode Product Search</h1>

      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter barcode or scan"
          className="flex-1 rounded-md border-gray-300 shadow-sm"
        />
        <button
          onClick={() => setShowScanner(!showScanner)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
        >
          <Camera className="w-5 h-5 mr-2" />
          {showScanner ? 'Close Scanner' : 'Scan Barcode'}
        </button>
      </div>

      {showScanner && (
        <div className="mb-6">
          <BarcodeScanner 
            onDetected={handleBarcodeDetected}
            onError={(error) => console.error('Scanner error:', error)}
          />
        </div>
      )}

      {isLoading && <div>Loading...</div>}
      {product && <ProductDetails product={product} />}
    </div>
  );
}