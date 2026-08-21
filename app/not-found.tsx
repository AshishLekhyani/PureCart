import Link from "next/link";

export default function NotFound() {
  return (
    <div className="gutter flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="label-sm text-muted">Error 404</p>
      <h1 className="display mt-5 text-[clamp(3rem,10vw,7rem)] uppercase">Page not found</h1>
      <p className="text-muted mt-6 max-w-sm">
        The page you were looking for has moved, sold out, or never existed. The collection is still
        here.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-solid">
          Back home
        </Link>
        <Link href="/shop/new" className="btn btn-outline">
          Shop new in
        </Link>
      </div>
    </div>
  );
}
