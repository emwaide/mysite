import React from 'react';
import Socials from '@/components/Socials';

const Hero: FC = () => {
  const sites = [
    {
      name: 'GitHub',
      url: 'https://github.com/bchiang7',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/emwaide',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/bchiang7',
    },
    {
      name: 'Email',
      url: 'mailto:aoskngl;snga',
    },
  ];

  return (
    <section className="flex flex-col justify-center items-start min-h-screen py-0 px-4 snap-start">
      <h1 className="text-5xl md:text-6xl text-primary font-bold">Welcome!</h1>
      <h2 className="text-4xl md:text-5xl text-accent mt-2 leading-tight">
        I&apos;m Emily, a Software Engineer.
      </h2>
      <p className="text-neutral-600 mt-5 max-w-xl">
        I love clean, accessible design. I try to build thoughtful, user-friendly interfaces with
        modern tools like React and Tailwind - mostly for fun (but always open to new
        opportunities).
      </p>
      <p className="text-neutral-600 mt-5 max-w-xl">
        This site is full of projects that I started based on some of my hobbies. So feel free to
        have a look around!
      </p>
      <Socials sites={sites} />
    </section>
  );
};

export default Hero;
