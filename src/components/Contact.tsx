// const skills: string[] = ['JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js', 'WordPress'];

// const Contact: React.FC = () => {
//   return (
//     <section id="contact" className="min-h-screen snap-start flex items-center px-6">
//       <div className="max-w-5xl mx-auto w-full space-y-12">
//         <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 w-fit">Say Hi!</h2>

//         <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
//           <div className="md:col-span-5 text-base text-gray-700">
//             <p className="mb-4">
//               Hello, my name is Emily! I&apos;m someone who finds joy in figuring things out—
//               whether that&apos;s solving a tricky coding problem, finding the best route on a long
//               walk, or tweaking a process until it just works. I&apos;m curious by nature, quietly
//               determined, and happiest when I&apos;m building something that feels thoughtful and
//               useful. Outside of work, you&apos;ll usually find me sailing, singing in harmony, or
//               getting distracted by a good view (usually with a camera in hand).
//             </p>

//             <p className="mb-2">
//               Here are a few technologies I&apos;ve been working with recently:
//             </p>

//             <ul className="grid grid-cols-2 gap-x-4 gap-y-2 list-none pl-0 mt-4">
//               {skills.map((skill, index) => (
//                 <li key={index} className="relative pl-6 font-mono text-sm text-gray-600">
//                   <span className="absolute left-0 text-teal-500">▹</span>
//                   {skill}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;

import React from 'react';

const Contact: React.FC = () => (
  <section className="min-h-screen snap-start flex items-center px-6 bg-sand text-primary">
    <div className="max-w-5xl mx-auto w-full space-y-12">
      <h2 className="text-3xl font-bold border-b-2 border-primary pb-2 w-fit">Say Hi!</h2>
      <p>
        Let’s get in touch. You can usually find me sailing or singing, but I’m always happy to
        chat.
      </p>
    </div>
  </section>
);

export default Contact;
