"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onChange: (quantity: number) => void;
  /** Below 1 the line is removed by the caller. */
  min?: number;
};

export default function QuantityStepper({ value, onChange, min = 0 }: Props) {
  return (
    <div className="border-line flex items-center border">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="hover:bg-sand px-2.5 py-2 transition-colors disabled:opacity-30"
      >
        <Minus className="size-3" strokeWidth={1.5} />
      </button>

      <span className="label-sm w-8 text-center tabular-nums" aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= 99}
        aria-label="Increase quantity"
        className="hover:bg-sand px-2.5 py-2 transition-colors disabled:opacity-30"
      >
        <Plus className="size-3" strokeWidth={1.5} />
      </button>
    </div>
  );
}
