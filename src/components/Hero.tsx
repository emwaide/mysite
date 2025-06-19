import React from 'react';
import Socials from '@/components/Socials';
import Icon from '@/components/icons/Icon';

const Hero: React.FC = () => (
  <section
    id="home"
    className="min-h-screen snap-start relative px-6 flex items-center justify-center"
  >
    <nav className="fixed top-0 right-0 p-6 space-x-4 z-50">
      <a href="#about" className="text-primary hover:underline">
        About
      </a>
      <a href="#projects" className="text-primary hover:underline">
        Projects
      </a>
      <a href="#contact" className="text-primary hover:underline">
        Contact
      </a>
    </nav>
    <div className="flex flex-col text-left space-y-4 z-10">
      <h1 className="text-5xl md:text-6xl text-primary font-bold">Welcome!</h1>
      <h2 className="text-4xl md:text-5xl text-accent leading-tight">
        I&apos;m Emily, a Software Engineer.
      </h2>
      <p className="text-neutral-600 mt-5 max-w-xl">
        I love clean, accessible design. I try to build thoughtful, user-friendly interfaces with
        modern tools like React and Tailwind - mostly for fun (but always open to new
        opportunities).
      </p>
      <p className="text-neutral-600 max-w-xl">
        This site is full of projects that I started based on some of my hobbies. So feel free to
        have a look around!
      </p>
      <Socials />
    </div>

    {/* Waves & Boat */}
    <div className="absolute bottom-0 left-0 w-full h-20 z-0 overflow-hidden">
      <div className="absolute bottom-0 w-[200%] h-10 bg-primary opacity-80 animate-wave" />
      <div className="absolute bottom-0 w-[200%] h-10 bg-primary opacity-60 animate-wave" />
      <div className="absolute bottom-7 left-[-3rem] w-12 h-12 animate-sail z-10">
        <div className="w-full h-full animate-bob">
          <Icon name="Boat" />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
