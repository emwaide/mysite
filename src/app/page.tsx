import Hero from '@/components/Hero';
import About from '@/components/About';
import ProjectList from '@/components/ProjectList';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <Hero />
      <About />
      <ProjectList />
      <Contact />
    </main>
  );
}
