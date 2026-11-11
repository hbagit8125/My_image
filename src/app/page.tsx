import { profile } from "@/data/content";

// Temporary landing page. Sections are added in the following pull requests.
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6">
      <h1 className="text-5xl font-semibold text-glow sm:text-7xl">
        {profile.name}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-haze">{profile.tagline}</p>
    </main>
  );
}
