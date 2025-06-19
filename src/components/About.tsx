import React from 'react';
import Icon from '@/components/icons/Icon';
import Photos from '@/components/Photos';

const About: React.FC = () => (
  <section className="min-h-screen snap-start flex items-center px-6">
    <div className="max-w-5xl mx-auto w-full space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3 text-base text-gray-700 space-y-6">
          <div>
            <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 w-fit">About Me</h2>
          </div>
          <p>
            Hello, my name is Emily! I&apos;m someone who finds joy in figuring things out— whether
            that&apos;s solving a tricky coding problem, finding the best route on a long walk, or
            tweaking a process until it just works. I&apos;m curious by nature, quietly determined,
            and happiest when I&apos;m building something that feels thoughtful and useful. Outside
            of work, you&apos;ll usually find me sailing, singing in harmony, or getting distracted
            by a good view (usually with a camera in hand).
          </p>
          <p>These are a few photos that I enjoyed taking.</p>
          <p>
            Most of my technology knowledge is kept on this project&apos;s README as I expand and
            explore new tech. To read it, and find out what this project uses you can check the
            README on GitHub. Feel free to take a look around.
          </p>
          <a
            key={'GitHub'}
            href={'https://github.com/emwaide/mysite/blob/main/README.md'}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={'GitHub README file'}
            className="flex items-center justify-center w-fit gap-2 mt-10 px-6 py-3 border-2 border-accent text-accent font-semibold rounded hover:bg-accent hover:text-white transition"
          >
            <div className="w-8 h-8">
              <Icon name={'GitHub'} />
            </div>
            My README
          </a>
        </div>

        <div className="md:col-span-2 flex items-start h-full">
          <div className="relative w-full h-full">
            <Photos />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
