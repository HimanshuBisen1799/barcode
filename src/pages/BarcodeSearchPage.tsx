import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import BarcodeScanner from '../components/BarcodeScanner';
import { Camera } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  sku: string;
  barcode: string;
}

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
          <BarcodeScanner onDetected={handleBarcodeDetected} />
        </div>
      )}

      {isLoading && <div>Loading...</div>}

      {product && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">SKU</p>
              <p className="font-medium">{product.sku}</p>
            </div>
            <div>
              <p className="text-gray-600">Category</p>
              <p className="font-medium">{product.category}</p>
            </div>
            <div>
              <p className="text-gray-600">Price</p>
              <p className="font-medium">${product.price}</p>
            </div>
            <div>
              <p className="text-gray-600">Quantity in Stock</p>
              <p className="font-medium">{product.quantity}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">Description</p>
            <p className="mt-1">{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}