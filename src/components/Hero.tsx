import React from 'react';
import Socials from '@/components/Socials'; // Make sure this import matches your actual path

const sites = [
  {
    name: 'GitHub',
    url: 'https://github.com/emwaide',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/emwaide',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/emilywaide',
  },
  {
    name: 'Email',
    url: 'mailto:aoskngl;snga',
  },
];

const Hero: React.FC = () => (
  <section className="min-h-screen snap-start flex flex-col items-center justify-center text-center px-6 space-y-4">
    <div className="text-left">
      <h1 className="text-5xl pb-2 md:text-6xl font-bold text-primary">Welcome!</h1>
      <h2 className="text-4xl py-2 md:text-5xl text-accent leading-tight">
        I&apos;m Emily, a Software Engineer.
      </h2>
      <p className="text-200 py-2 max-w-xl">
        I love clean, accessible design. I try to build thoughtful, user-friendly interfaces with
        modern tools like React and Tailwind – mostly for fun (but always open to new
        opportunities).
      </p>
      <p className="text-200 py-2 max-w-xl">
        This site is full of projects that I started based on some of my hobbies. So feel free to
        have a look around!
      </p>
      <Socials sites={sites} />
    </div>
  </section>
);

export default Hero;
