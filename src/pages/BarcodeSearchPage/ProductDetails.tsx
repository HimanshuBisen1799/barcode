import { Product } from './types';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
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
  );
}