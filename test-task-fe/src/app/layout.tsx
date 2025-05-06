"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const categories = [
    "Beef",
    "Chicken",
    "Dessert",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
    "Breakfast",
    "Goat",
  ];

  const category = searchParams.get("category");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          <main className="flex-1 p-5">{children}</main>

          <aside className="w-xl-80 p-5 border-l border-gray-300 bg-gray-800 text-white">
            <h3 className="text-xl font-bold mb-4">
              {category
                ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
                : "Sidebar"}
            </h3>
            <p className="mb-4"></p>
            <ul className="list-none p-0">
              {categories.map((categoryName) => (
                <li key={categoryName} className="mb-2">
                  <Link
                    href={`/recipe?category=${categoryName.toLowerCase()}`}
                    className="text-white hover:text-gray-400"
                  >
                    {categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </body>
    </html>
  );
}
