import Header from "@/app/components/header";
import Image from "next/image";
import Link from "next/link";

async function getProduct(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <div className=" bg-gray-100 min-h-screen ">
      <Header></Header>
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10 bg-white mt-10 shadow-sm  rounded-3xl">
        <div>
          <div className="border rounded-md overflow-hidden">
            <Image
              priority
              src={product.image}
              alt={product.title}
              width={600}
              height={600}
              className="w-full object-contain bg-white"
            />
          </div>
          <div className="mt-4 flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-20 h-20 border rounded cursor-pointer ${
                  i === 0 ? "ring-2 ring-blue-600" : ""
                }`}
              >
                <Image
                  priority
                  src={product.image}
                  alt={`Thumbnail ${i}`}
                  width={80}
                  height={80}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-green-600 font-medium">In stock</span>
          <h1 className="text-2xl font-bold mt-2">{product.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="text-yellow-500">⭐ {product.rating || 5.0}</div>
            <Link href="#reviews" className="text-blue-600 underline text-sm">
              {product.numReviews} Reviews
            </Link>
          </div>

          <div className="text-3xl font-semibold my-4">
            ${parseFloat(product.discountedPrice).toFixed(2)}
            {product.discountedPrice < product.price && (
              <span className="ml-2 text-xl font-thin line-through text-gray-500">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex gap-2 mb-4">
            <button className="border px-4 py-2 rounded hover:bg-gray-100">
              Add to favorites
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Add to cart
            </button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <label htmlFor="qty">Quantity</label>
            <select id="qty" className="border p-2 rounded">
              {[...Array(5)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
