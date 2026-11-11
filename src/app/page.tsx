import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}
