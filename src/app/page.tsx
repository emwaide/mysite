import Hero from '@/components/Hero';
import About from '@/components/About';
import ProjectList from '@/components/ProjectList';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-0 space-y-32 text-neutral-800">
      <Hero />
      <About />
      <ProjectList />
      <Contact />
    </main>
  );
}
