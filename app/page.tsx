import { SectionRail } from "@/components/section-rail";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Research } from "@/components/sections/research";
import { Notes } from "@/components/sections/notes";
import { GitHub } from "@/components/sections/github";
import { Contact } from "@/components/sections/contact";
import { Meeting } from "@/components/sections/meeting";

export default function HomePage() {
  return (
    <>
      <SectionRail />
      <div className="wrap">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Research />
        <Notes />
        {/* Server component: fetched and cached on the server, streamed in. */}
        <GitHub />
        <Contact />
        <Meeting />
      </div>
    </>
  );
}
