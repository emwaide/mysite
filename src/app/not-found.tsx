import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen relative px-6 flex items-center justify-center">
      <div className="flex flex-col text-left space-y-4 items-center mt-16 z-10 pb-24">
        <h1 className="text-5xl md:text-6xl text-primary font-bold">Whoops!</h1>
        <h2 className="text-4xl md:text-5xl text-accent leading-tight">
          I haven&apos;t created this page yet!
        </h2>
        <div className="itmes-center">
          <Link
            href="/"
            className="flex items-center justify-center w-fit gap-2 mt-10 px-6 py-3 border-2 border-accent text-accent font-semibold rounded hover:bg-accent hover:text-white transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
