import { motion, useReducedMotion } from "framer-motion"
import { about } from "../../data/about"

function About() {
  const reduceMotion = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-body text-xs tracking-widest uppercase text-text-secondary"
      >
        {about.chapter} — {about.eyebrow}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="font-display text-3xl md:text-5xl leading-tight text-text-primary mt-6 max-w-3xl"
      >
        {about.statement}
      </motion.h2>

      <div className="mt-10 max-w-xl space-y-5">
        {about.paragraphs.map((p, i) => (
          <motion.p
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 + i * 0.15 }}
            className="font-body text-base md:text-lg text-text-secondary leading-relaxed"
          >
            {p}
          </motion.p>
        ))}
      </div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="font-body text-sm tracking-wide text-text-muted mt-12 italic"
      >
        {about.meta}
      </motion.p>
    </section>
  )
}

export default About
