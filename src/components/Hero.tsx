'use client';

const Hero: FC = () => {
  return (
    <section className="flex flex-col justify-center items-start min-h-screen py-0 px-4">
      <h1 className="text-5xl md:text-6xl text-primary font-bold">Welcome!</h1>
      <h2 className="text-4xl md:text-5xl text-neutral-800 mt-2 leading-tight">
        I`&apos;`m Emily, a Software Engineer
      </h2>
      <p className="text-neutral-600 mt-5 max-w-xl">
        I love clean, accessible design. I try to build thoughtful, user-friendly interfaces with
        modern tools like React and Tailwind - mostly for fun (but always open to new
        opportunities).
      </p>
      <p className="text-neutral-600 mt-5 max-w-xl">
        I love clean, accessible design. I try to build thoughtful, user-friendly interfaces with
        modern tools like React and Tailwind - mostly for fun (but always open to new
        opportunities).
      </p>
      <a
        href="/#About"
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-10 px-6 py-3 border-2 border-accent text-accent font-semibold rounded hover:bg-accent hover:text-white transition"
      >
        Explore!
      </a>
    </section>
  );
};

export default Hero;
