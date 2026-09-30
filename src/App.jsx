import { lazy, Suspense } from "react"
import SmoothScroll from "./experience/scroll/SmoothScroll"
import Hero from "./sections/Hero/Hero"
import About from "./sections/About/About"
import Skills from "./sections/Skills/Skills"
import Education from "./sections/Education/Education"
import Proof from "./sections/Proof/Proof"
import Projects from "./sections/Projects/Projects"
import Experience from "./sections/Experience/Experience"
import CreativeIdentity from "./sections/CreativeIdentity/CreativeIdentity"
import Experiments from "./sections/Experiments/Experiments"
import Contact from "./sections/Contact/Contact"
import DeepSpace from "./sections/DeepSpace/DeepSpace"
import Footer from "./components/Footer/Footer"

const Galaxy = lazy(() => import("./experience/galaxy/Galaxy"))

function App() {
  return (
    <SmoothScroll>
      <Suspense fallback={null}>
        <Galaxy />
      </Suspense>
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Proof />
        <Projects />
        <Experience />
        <CreativeIdentity />
        <Experiments />
        <Contact />
        <DeepSpace />
        <Footer />
      </main>
    </SmoothScroll>
  )
}

export default App
