"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import { categories } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      className={cn(
        "bg-paper ease-out-soft fixed inset-0 z-60 transition-transform duration-500 lg:hidden",
        open ? "translate-x-0" : "pointer-events-none -translate-x-full",
      )}
    >
      <div className="gutter border-line flex h-16 items-center justify-between border-b">
        <span className="display text-[1.5rem] tracking-[0.2em] uppercase">PureCart</span>
        <button type="button" onClick={onClose} aria-label="Close menu">
          <X className="size-5" strokeWidth={1.25} />
        </button>
      </div>

      <nav className="gutter flex flex-col py-10">
        {[
          ...categories.map((c) => ({ href: `/shop/${c.id}`, label: c.name })),
          { href: "/shop/new", label: "New In" },
        ].map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            style={{ animationDelay: open ? `${index * 60}ms` : "0ms" }}
            className={cn("display border-line border-b py-5 text-4xl uppercase", open && "reveal")}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="gutter flex flex-col gap-4">
        <Link href="/wishlist" onClick={onClose} className="label link-underline self-start">
          Wishlist
        </Link>
        <Link href="/orders" onClick={onClose} className="label link-underline self-start">
          Orders
        </Link>
        <Link href="/cart" onClick={onClose} className="label link-underline self-start">
          Shopping Bag
        </Link>
      </div>
    </div>
  );
}
