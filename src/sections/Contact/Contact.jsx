import { motion, useReducedMotion } from "framer-motion"
import { contact } from "../../data/contact"

function Contact() {
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
        {contact.chapter} — {contact.eyebrow}
      </motion.p>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        className="font-display text-3xl md:text-5xl leading-tight text-text-primary mt-8 max-w-2xl"
      >
        {contact.lineOne}
      </motion.h2>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
        className="font-display text-3xl md:text-5xl leading-tight text-text-primary mt-2 max-w-2xl"
      >
        {contact.lineTwo}
      </motion.h2>

      <motion.a
        href={"mailto:" + contact.email}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
        className="mt-14 font-body text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors"
      >
        {contact.cta} →
      </motion.a>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
        className="font-body text-sm text-text-muted mt-4"
      >
        {contact.email}
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.85 }}
        className="mt-10 flex gap-6"
      >
        {contact.links.map((link) => (
            <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs tracking-widest uppercase text-text-secondary hover:text-text-primary transition-colors"
          >
            {link.label}
          </a>
        ))}
      </motion.div>
    </section>
  )
}

export default Contact
