import cvPdf from "./assets/Karim's CV.pdf";

export default function Header() {
  return (
    <div className="header flex h-screen w-full items-center justify-center overflow-hidden px-6">
        <div className="starfield" aria-hidden="true" />
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
          <h1 className="text-center text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            Hello I&apos;m Karim. I&apos;m a Software Engineer
            <span className="caret" aria-hidden="true" />
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              href={cvPdf}
              download="Karim-Hawwa-CV.pdf"
            >
              Download CV
            </a>
            <a
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              href="#contact"
            >
              Contact Me
            </a>
          </div>
        </div>
    </div>
  );
}
