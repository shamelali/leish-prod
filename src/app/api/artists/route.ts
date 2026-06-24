import { NextResponse } from "next/server";
import { artists, categories } from "@/data/artists";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "rating";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");

  let result = artists.filter((a) => {
    const matchesSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase()) ||
      a.categories.some((c) => c.includes(search.toLowerCase()));
    const matchesCategory = !category || category === "all" || a.categories.includes(category);
    return matchesSearch && matchesCategory;
  });

  if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
  else if (sort === "price-low") result.sort((a, b) => a.price - b.price);
  else if (sort === "price-high") result.sort((a, b) => b.price - a.price);

  const total = result.length;
  const totalPages = Math.ceil(total / limit);
  const paged = result.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    artists: paged,
    categories,
    pagination: { page, limit, total, totalPages },
  });
}
