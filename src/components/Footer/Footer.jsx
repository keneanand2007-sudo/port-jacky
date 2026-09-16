function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-16 text-center border-t border-white/10">
      <p className="font-display text-lg text-text-primary">JACK</p>
      <p className="font-body text-xs tracking-widest uppercase text-text-secondary mt-2">
        Quiet Interface. Loud Experience.
      </p>
      <p className="font-body text-xs text-text-muted mt-6">
        © {year} Jack
      </p>
      <p className="font-body text-xs tracking-wide uppercase text-text-muted mt-1">
        Built with React · Vite · Tailwind CSS · Framer Motion
      </p>
    </footer>
  )
}

export default Footer
