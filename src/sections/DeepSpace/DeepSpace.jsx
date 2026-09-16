import { motion, useReducedMotion } from "framer-motion"
import { deepSpace } from "../../data/deepSpace"
import { contact } from "../../data/contact"

function DeepSpace() {
  const reduceMotion = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="font-display text-2xl md:text-4xl leading-tight text-text-primary max-w-xl"
      >
        {deepSpace.lineOne}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="font-body text-sm tracking-widest uppercase text-text-secondary mt-6"
      >
        {deepSpace.lineTwo}
      </motion.p>

      <motion.a
        href={"mailto:" + contact.email}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
        className="font-body text-sm tracking-widest uppercase text-text-muted mt-3 hover:text-text-primary transition-colors"
      >
        {deepSpace.lineThree}
      </motion.a>
    </section>
  )
}

export default DeepSpace
