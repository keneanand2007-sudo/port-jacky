import { motion, useReducedMotion } from "framer-motion"
import { experience } from "../../data/experience"

function Experience() {
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
        {experience.chapter} — {experience.eyebrow}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="font-display text-3xl md:text-5xl leading-tight text-text-primary mt-6 max-w-3xl"
      >
        {experience.statement}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="font-body text-base md:text-lg text-text-secondary leading-relaxed mt-8 max-w-xl"
      >
        {experience.intro}
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
        className="mt-14 flex flex-wrap justify-center gap-3"
      >
        {experience.positioning.map((step, i) => (
          <span
            key={step}
            className="font-body text-xs tracking-widest uppercase text-text-secondary border border-white/10 rounded-full px-4 py-2"
          >
            {step}
            {i < experience.positioning.length - 1 && (
              <span className="ml-3 text-text-muted">→</span>
            )}
          </span>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="mt-14 max-w-2xl"
      >
        <p className="font-body text-xs tracking-widest uppercase text-text-muted mb-3">
          MY CYCLE
        </p>
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          {experience.cycle.join(" → ")}
        </p>
      </motion.div>
    </section>
  )
}

export default Experience
