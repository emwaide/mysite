// app/page.tsx or app/home/page.tsx
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import ProjectList from '@/components/portfolio/ProjectList';
import Contact from '@/components/portfolio/Contact';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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
