import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all products from the database
    const products = await prisma.products.findMany();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("image") as File;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const discountedPrice = parseFloat(formData.get("discountedPrice") as string);
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((tag) => tag.trim());

  const rating = parseInt(formData.get("rating") as string);
  const numReviews = parseInt(formData.get("numReviews") as string);

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploaded = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });
    console.log(uploaded);
    const product = await prisma.products.create({
      data: {
        title,
        description,
        price,
        discountedPrice,
        tags,
        rating,
        numReviews,
        image: uploaded.secure_url,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload product" },
      { status: 500 }
    );
  }
}
