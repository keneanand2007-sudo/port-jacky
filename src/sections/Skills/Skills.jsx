import { motion, useReducedMotion } from "framer-motion"
import { skillGroups, exploring } from "../../data/skills"

function Skills() {
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
        CHAPTER 03 — CAPABILITY
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="font-display text-3xl md:text-5xl leading-tight text-text-primary mt-6 max-w-3xl"
      >
        SKILLS
      </motion.h2>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10 max-w-4xl">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.category}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * i }}
          >
            <p className="font-body text-xs tracking-widest uppercase text-text-muted mb-3">
              {group.category}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="font-body text-base text-text-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        className="mt-16 max-w-2xl"
      >
        <p className="font-body text-xs tracking-widest uppercase text-text-muted mb-3">
          {exploring.label}
        </p>
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          {exploring.items.join(" · ")}
        </p>
      </motion.div>
    </section>
  )
}

export default Skills
