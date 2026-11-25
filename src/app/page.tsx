import Hero from "@/components/sections/Hero";
import StackMarquee from "@/components/sections/StackMarquee";
import Projects from "@/components/sections/Projects";
import Content from "@/components/sections/Content";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <StackMarquee />
      <Projects />
      <Content />
      <About />
      <Contact />
    </main>
  );
}
