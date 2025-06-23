import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import ProjectList from '@/components/portfolio/ProjectList';
import Contact from '@/components/portfolio/Contact';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      <Hero session={session} />
      <About />
      <ProjectList />
      <Contact />
    </main>
  );
}
