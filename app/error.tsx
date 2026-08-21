"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="gutter flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="label-sm text-muted">Something went wrong</p>
      <h1 className="display mt-5 text-[clamp(2.5rem,8vw,5.5rem)] uppercase">
        This page did not load
      </h1>
      <p className="text-muted mt-6 max-w-sm">
        The collection is still here. Try again, and if it keeps happening, head back to the
        homepage.
      </p>

      {error.digest && <p className="label-sm text-muted mt-4">Reference {error.digest}</p>}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-solid">
          Try again
        </button>
        <Link href="/" className="btn btn-outline">
          Back home
        </Link>
      </div>
    </div>
  );
}
