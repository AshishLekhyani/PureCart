"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import SizeTable from "./SizeTable";
import type { SizeTable as SizeTableData } from "@/lib/sizeGuide";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  /** The chart matching this product's size run. */
  table: SizeTableData;
};

export default function SizeGuideDrawer({ open, onClose, table }: Props) {
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
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "bg-ink/35 fixed inset-0 z-70 transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Size guide"
        className={cn(
          "border-line bg-paper ease-out-soft fixed top-0 right-0 z-80 flex h-full w-full max-w-lg flex-col border-l transition-transform duration-500",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="border-line flex items-center justify-between border-b px-6 py-5">
          <h2 className="label">Size guide — {table.title}</h2>
          <button type="button" onClick={onClose} aria-label="Close size guide">
            <X className="size-5" strokeWidth={1.25} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <SizeTable table={table} />

          <div className="border-line mt-10 border-t pt-6">
            <h3 className="label">How to measure</h3>
            <ul className="text-ink-soft mt-4 space-y-2">
              <li>Chest — around the fullest part, keeping the tape level under the arms.</li>
              <li>Waist — around the natural waist, at the narrowest point.</li>
              <li>Hip — around the fullest part, roughly 20 cm below the waist.</li>
            </ul>
            <p className="text-muted mt-5">
              Between two sizes? Take the larger one. Our cuts run close rather than roomy.
            </p>
          </div>

          <Link
            href="/size-guide"
            onClick={onClose}
            className="label link-underline mt-8 inline-block"
          >
            See every size chart
          </Link>
        </div>
      </aside>
    </>
  );
}
