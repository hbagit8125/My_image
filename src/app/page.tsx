import About from "@/components/About";
import Achievements from "@/components/Achievements";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import GithubSection from "@/components/GithubSection";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Skills from "@/components/Skills";
import { getGithubData } from "@/lib/github";
import { formatDate, getPosts } from "@/lib/posts";

// Rebuild the page in the background about once an hour so GitHub data stays fresh.
export const revalidate = 3600;

export default async function Home() {
  const posts = (await getPosts()).map((p) => ({ ...p, dateLabel: formatDate(p.date) }));
  const github = await getGithubData();

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
        <GithubSection data={github} />
        <Achievements />
        <BlogPreview posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
