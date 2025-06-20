import React from 'react';
import Socials from '@/components/portfolio/Socials';

const Contact: React.FC = () => (
  <section id="contact" className="min-h-screen lg:snap-start flex items-center px-6">
    <div className="max-w-5xl mx-auto space-y-12 my-8">
      <div className="max-w-5xl mx-auto space-y-12 lg:w-1/2">
        <h2 className="text-3xl font-bold border-b-2 text-primary border-gray-300 pb-2 w-fit">
          Say Hi!
        </h2>
        <p>
          I&apos;m always happy to chat, and always welcome new opportunities, so whether it&apos;s
          about code, collaboration, or a shared love of any of my hobbies - Drop me a message!
        </p>
        <Socials />
      </div>
    </div>
  </section>
);

export default Contact;
