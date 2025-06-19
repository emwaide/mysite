import React from 'react';
import Socials from '@/components/Socials';

const Contact: React.FC = () => (
  <section id="contact" className="min-h-screen snap-start flex items-center px-6">
    <div className="max-w-5xl mx-auto w-full space-y-12">
      <div className="max-w-5xl mx-auto w-full space-y-12">
        <h2 className="text-3xl font-bold border-b-2 text-primary border-gray-300 pb-2 w-fit">
          Say Hi!
        </h2>
        <p>
          {' '}
          I&apos;m always happy to chat, and always welcome new opportunities, so whether it&apos;s
          about code, collaboration, or a shared love of any of my hobbies - Drop me a message!
        </p>
      </div>
    </div>
    <Socials />
  </section>
);

export default Contact;
