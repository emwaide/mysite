import { projects } from '@/data/projects';

export default function ProjectList() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-neutral-800">Projects</h2>
      <ul className="space-y-4">
        {projects.map(project => (
          <li key={project.name} className="border rounded-lg p-4 hover:bg-neutral-100 transition">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <h3 className="text-lg font-medium">{project.name}</h3>
              <p className="text-muted-foreground">{project.description}</p>
              <ul className="flex flex-wrap gap-2 mt-2 text-sm text-neutral-600">
                {project.tags.map(tag => (
                  <li key={tag} className="bg-neutral-200 px-2 py-0.5 rounded">
                    {tag}
                  </li>
                ))}
              </ul>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
