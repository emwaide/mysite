import Hero from '@/components/Hero';
import About from '@/components/About';
import ProjectList from '@/components/ProjectList';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <main className="mx-auto px-6 space-y-32 text-neutral-800 flex flex-col">
      <Hero />
      <About />
      <ProjectList />
      <Contact />
    </main>
  );
}
