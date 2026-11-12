import About from "./info/About.jsx";
import Experience from "./info/Experience.jsx";
import Education from "./info/Education.jsx";
import Skills from "./info/Skills.jsx";

export default function Info() {
  return (
    <section className="my-info flex justify-center px-6 py-24">
      <div className="w-full max-w-5xl space-y-24 text-left">
        <About />
        <Experience />
        <Education />
        <Skills />
      </div>
    </section>
  );
}
