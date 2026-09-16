import { motion, useReducedMotion } from "framer-motion"
import { creativeIdentity } from "../../data/creativeIdentity"

function CreativeIdentity() {
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
        {creativeIdentity.chapter} — {creativeIdentity.eyebrow}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        className="font-display text-3xl md:text-5xl leading-tight text-text-primary mt-8 max-w-2xl"
      >
        {creativeIdentity.lineOne}
      </motion.h2>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
        className="font-display text-3xl md:text-5xl leading-tight text-text-primary mt-2 max-w-2xl"
      >
        {creativeIdentity.lineTwo}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.65 }}
        className="font-body text-base text-text-secondary leading-relaxed mt-10 max-w-lg"
      >
        {creativeIdentity.supporting}
      </motion.p>
    </section>
  )
}

export default CreativeIdentity
