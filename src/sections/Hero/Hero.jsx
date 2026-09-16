import { motion, useReducedMotion } from "framer-motion"
import { hero } from "../../data/hero"

function Hero() {
  const reduceMotion = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-display text-5xl md:text-7xl leading-tight text-text-primary"
      >
        {hero.greeting}
      </motion.h1>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="font-display text-3xl md:text-5xl leading-tight text-text-primary mt-4"
      >
        {hero.statement}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="font-body text-sm md:text-base tracking-widest uppercase text-text-secondary mt-6"
      >
        {hero.role}
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        className="mt-16 font-body text-xs tracking-widest uppercase text-text-secondary"
      >
        {hero.cta}
        <div className="mt-2 text-lg animate-bounce">↓</div>
      </motion.div>
    </section>
  )
}

export default Hero
