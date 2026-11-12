import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import Experience from "./components/Experience.jsx";
import MoreProjects from "./components/MoreProjects.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <Hero />
        <Work />
        <Experience />
        <MoreProjects />
        <Skills />
        <Education />
      </main>
      <Contact />
    </>
  );
}
