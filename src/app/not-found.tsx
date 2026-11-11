import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col items-start justify-center px-6">
      <p className="font-mono text-sm text-glow">404</p>
      <h1 className="mt-3 text-5xl font-semibold">This page doesn&apos;t exist</h1>
      <p className="mt-4 text-lg text-haze">
        The link may be old or mistyped. The home page has everything.
      </p>
      <Link href="/" className="mt-8 rounded-full bg-moon px-6 py-3 font-medium text-night shadow-glow">
        Go to home page
      </Link>
    </main>
  );
}
