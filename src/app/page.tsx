import About from "@/components/About";
import Achievements from "@/components/Achievements";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Skills from "@/components/Skills";
import { formatDate, getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = (await getPosts()).map((p) => ({ ...p, dateLabel: formatDate(p.date) }));

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <BlogPreview posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
