import { motion, useReducedMotion } from "framer-motion"
import { education } from "../../data/education"

function Education() {
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
        {education.chapter} — {education.eyebrow}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="font-display text-3xl md:text-5xl leading-tight text-text-primary mt-6 max-w-3xl"
      >
        {education.statement}
      </motion.h2>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="mt-12 max-w-xl border-l border-white/10 pl-6 text-left"
      >
        <p className="font-display text-xl md:text-2xl text-text-primary">
          {education.program}
        </p>
        <p className="font-body text-base text-text-secondary mt-1">
          {education.university}
        </p>
        <p className="font-body text-sm tracking-wide uppercase text-text-muted mt-2">
          {education.status}
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
        className="mt-14 max-w-2xl"
      >
        <p className="font-body text-xs tracking-widest uppercase text-text-muted mb-3">
          FOCUS AREAS
        </p>
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          {education.focusAreas.join(" · ")}
        </p>
      </motion.div>
    </section>
  )
}

export default Education
