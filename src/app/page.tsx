import Hero from "@/components/sections/Hero";
import StackMarquee from "@/components/sections/StackMarquee";
import Projects from "@/components/sections/Projects";
import Content from "@/components/sections/Content";
import Socials from "@/components/sections/Socials";
import BlogTeaser from "@/components/sections/BlogTeaser";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <StackMarquee />
      <Projects />
      <Content />
      <Socials />
      <About />
      <BlogTeaser />
      <Contact />
    </main>
  );
}
