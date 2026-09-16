import { motion, useReducedMotion } from "framer-motion"
import { proof } from "../../data/proof"

function Proof() {
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
        CHAPTER 05 — CHALLENGE
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="font-display text-3xl md:text-5xl leading-tight text-text-primary mt-6 max-w-3xl"
      >
        LEARNING DOESN'T HAPPEN IN COMFORT.
      </motion.h2>

      {proof.length > 0 ? (
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl w-full">
          {proof.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.url || undefined}
              target={item.url ? "_blank" : undefined}
              rel={item.url ? "noopener noreferrer" : undefined}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * i }}
              className="text-left border border-white/10 rounded-lg p-6 hover:border-white/25 transition-colors"
            >
              <p className="font-display text-lg text-text-primary">
                {item.title}
              </p>
              <p className="font-body text-sm text-text-secondary mt-1">
                {item.issuer} · {item.year}
              </p>
            </motion.a>
          ))}
        </div>
      ) : (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="font-body text-base text-text-secondary mt-12 max-w-md"
        >
          Documenting the milestones as I go — this chapter is being written in real time.
        </motion.p>
      )}
    </section>
  )
}

export default Proof
