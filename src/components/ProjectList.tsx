'use client';

import React, { useState } from 'react';
import { projects } from '@/data/projects';

const ProjectList: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const filteredProjects = selectedTags.length
    ? projects.filter(project => selectedTags.every(tag => project.tags.includes(tag)))
    : projects;

  return (
    <section
      id="projects"
      className="min-h-screen lg:snap-start flex flex-col lg:pt-20 sm:pt-2 px-6 text-primary"
    >
      <div className="max-w-5xl mx-auto w-full space-y-6 mt-8">
        <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 w-fit">Projects</h2>

        <div role="group" aria-label="Filter projects by tag" className="flex flex-wrap gap-2">
          <p className="mr-6 text-base text-gray-700"> Filter by Tag: </p>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded border text-sm font-medium transition focus:outline-none
                ${
                  selectedTags.includes(tag)
                    ? 'bg-rose text-white border-rose'
                    : 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200'
                }`}
              aria-pressed={selectedTags.includes(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div
          className="overflow-y-auto max-h-[60vh] pr-2"
          role="region"
          aria-label="Filtered projects list"
        >
          <ul className="space-y-6">
            {filteredProjects.map(project => (
              <li
                key={project.name}
                className="border border-neutral-200 rounded p-6 hover:bg-neutral-100 transition"
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
                      <li key={tag} className="bg-rose rounded text-white px-2 py-0.5">
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
};

export default ProjectList;
