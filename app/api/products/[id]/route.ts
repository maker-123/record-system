import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const product = await prisma.products.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const discountedPrice = formData.get("discountedPrice") as string;

    const tags = (formData.get("tags") as string)
      .split(",")
      .map((tag) => tag.trim());
    const rating = parseInt(formData.get("rating") as string);
    const numReviews = parseInt(formData.get("numReviews") as string);
    const existingImage = formData.get("existingImage") as string;
    const file = formData.get("image") as File | null;

    let imageUrl = existingImage;

    if (file && typeof file !== "string") {
      const existingPublicId = extractPublicIdFromUrl(existingImage);

      if (existingPublicId) {
        await cloudinary.uploader.destroy(existingPublicId);
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }
    const parsedPrice = parseFloat(price);
    const parsedDiscountedPrice = parseFloat(discountedPrice);

    const updated = await prisma.products.update({
      where: { id },
      data: {
        title,
        description,
        price: parsedPrice,
        discountedPrice: parsedDiscountedPrice,
        tags,
        rating,
        numReviews,
        image: imageUrl,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

function extractPublicIdFromUrl(url: string) {
  const regex = /\/v\d+\/(.*)\./;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const product = await prisma.products.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const publicId = extractPublicIdFromUrl(product.image);

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    await prisma.products.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
