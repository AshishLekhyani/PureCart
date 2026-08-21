"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, X } from "lucide-react";
import { categories } from "@/lib/catalog";
import { useCart, selectCount } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { cn } from "@/lib/utils";
import SearchPanel from "./SearchPanel";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = useCart((state) => state.items);
  const hydrated = useCart((state) => state.hydrated);
  const openDrawer = useCart((state) => state.openDrawer);
  const count = selectCount(items);

  const savedIds = useWishlist((state) => state.ids);
  const wishlistHydrated = useWishlist((state) => state.hydrated);
  const savedCount = wishlistHydrated ? savedIds.length : 0;

  const isHome = pathname === "/";
  // On the home page the header floats over the light hero — no rule, no fill —
  // until the user scrolls past it and it settles onto paper.
  const overlay = isHome && !scrolled && !searchOpen && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-500",
          overlay
            ? "border-transparent bg-transparent"
            : "border-line bg-paper/90 backdrop-blur-sm",
        )}
      >
        <div className="gutter flex h-16 items-center justify-between gap-6 lg:h-20">
          {/* Left — desktop navigation, mobile menu trigger */}
          <nav className="hidden flex-1 items-center gap-7 lg:flex">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/${category.id}`}
                data-active={pathname.startsWith(`/shop/${category.id}`)}
                className="label link-underline"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/shop/new"
              data-active={pathname === "/shop/new"}
              className="label link-underline"
            >
              New In
            </Link>
            <Link
              href="/shop/sale"
              data-active={pathname === "/shop/sale"}
              className="label link-underline text-sale"
            >
              Sale
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex-1 lg:hidden"
          >
            <Menu className="size-5" strokeWidth={1.25} />
          </button>

          {/* Centre — wordmark */}
          <Link href="/" aria-label="PureCart home" className="shrink-0">
            <span className="display text-[1.5rem] tracking-[0.2em] uppercase lg:text-[1.75rem]">
              PureCart
            </span>
          </Link>

          {/* Right — utilities */}
          <div className="flex flex-1 items-center justify-end gap-5 lg:gap-7">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              aria-label={searchOpen ? "Close search" : "Search"}
              aria-expanded={searchOpen}
              className="label link-underline hidden items-center gap-2 lg:inline-flex"
            >
              {searchOpen ? (
                <X className="size-4" strokeWidth={1.25} />
              ) : (
                <Search className="size-4" strokeWidth={1.25} />
              )}
              <span>{searchOpen ? "Close" : "Search"}</span>
            </button>

            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              aria-label="Search"
              className="lg:hidden"
            >
              <Search className="size-5" strokeWidth={1.25} />
            </button>

            <Link href="/orders" className="label link-underline hidden lg:inline-block">
              Orders
            </Link>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="link-underline relative hidden lg:inline-flex"
            >
              <Heart className={cn("size-4", savedCount > 0 && "fill-ink")} strokeWidth={1.25} />
              {savedCount > 0 && (
                <span className="label-sm absolute -top-2 -right-2.5 tabular-nums">
                  {savedCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              className="label link-underline whitespace-nowrap"
            >
              Bag
              <span className="ml-1 tabular-nums">({hydrated ? count : 0})</span>
            </button>
          </div>
        </div>
      </header>

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
