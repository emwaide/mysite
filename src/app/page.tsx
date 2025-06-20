import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import ProjectList from '@/components/portfolio/ProjectList';
import Contact from '@/components/portfolio/Contact';

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
