import React from 'react';
import { projects } from '@/data/projects';

const ProjectList: React.FC = () => (
  <section id="projects" className="min-h-screen snap-start flex items-center px-6">
    <div className="max-w-5xl mx-auto w-full space-y-12">
      <div className="max-w-5xl mx-auto w-full space-y-12">
        <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 w-fit">Projects</h2>
        <ul className="space-y-6">
          {projects.map(project => (
            <li
              key={project.name}
              className="border border-neutral-200 rounded-lg p-6 hover:bg-neutral-100 transition"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block space-y-2"
              >
                <h3 className="text-lg font-semibold text-neutral-800">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <ul className="flex flex-wrap gap-2 text-sm text-neutral-600">
                  {project.tags.map(tag => (
                    <li key={tag} className="bg-rose text-white px-2 py-0.5 rounded">
                      {tag}
                    </li>
                  ))}
                </ul>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default ProjectList;
