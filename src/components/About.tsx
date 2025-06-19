const skills: string[] = ['JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js', 'WordPress'];

const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen snap-start flex items-center px-6">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 w-fit">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3 text-base text-gray-700">
            <p className="mb-4">
              Hello, my name is Emily! I&apos;m someone who finds joy in figuring things out—
              whether that&apos;s solving a tricky coding problem, finding the best route on a long
              walk, or tweaking a process until it just works. I&apos;m curious by nature, quietly
              determined, and happiest when I&apos;m building something that feels thoughtful and
              useful. Outside of work, you&apos;ll usually find me sailing, singing in harmony, or
              getting distracted by a good view (usually with a camera in hand).
            </p>

            <p className="mb-2">
              Here are a few technologies I&apos;ve been working with recently:
            </p>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 list-none pl-0 mt-4">
              {skills.map((skill, index) => (
                <li key={index} className="relative pl-6 font-mono text-sm text-gray-600">
                  <span className="absolute left-0 text-teal-500">▹</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 max-w-xs mx-auto md:mx-0">
            <div className="relative group aspect-square">
              <div className="rounded-lg overflow-hidden bg-teal-500 shadow-lg h-full w-full transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <div className="absolute top-3.5 left-3.5 w-full h-full border-2 border-teal-500 rounded-lg z-[-1] transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
