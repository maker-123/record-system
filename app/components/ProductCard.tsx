import React from "react";
import Image from "next/image";
import Link from "next/link";
interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  tags: string[];
  rating: number;
  numReviews: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  description,
  price,
  discountedPrice,
}) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="max-w-sm rounded-lg overflow-hidden shadow-sm transform  transition-all duration-200 ease-in-out border border-transparent bg-gray-50 flex flex-col justify-between hover:border hover:border-cyan-500">
        <div className="relative">
          <div className="overflow-hidden">
            <Image
              priority
              className="w-full object-cover h-56 hover:scale-110 ease-in-out duration-200 overflow-hidden"
              src={image}
              alt="Product image"
              width={500}
              height={500}
            />
          </div>
          {discountedPrice < price && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>

        <div className="px-4 py-3">
          <div className="font-semibold text-lg text-gray-900 mb-2">
            {title}
          </div>

          <p className="text-sm text-gray-500 mb-2 h-20 overflow-hidden">
            {description}
          </p>

          <div className="flex items-center mb-4">
            <span className="text-xl font-semibold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </span>
            {discountedPrice < price && (
              <span className="ml-2 text-sm line-through text-gray-500">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
