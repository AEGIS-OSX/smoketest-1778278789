"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LegalFooter() {
  return (
    <motion.footer
      className="legal-footer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="legal-footer-shell">
        <div className="legal-footer-brand">PawWalk</div>
        <div className="legal-footer-copy">
          <p>© PawWalk. All rights reserved.</p>
          <p>
            By signing up you consent to our use of your email for updates and offers. See our Privacy Policy and Terms of Service.
          </p>
          <nav className="legal-footer-links" aria-label="Legal links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>
          <a className="legal-footer-contact" href="mailto:hello@pawwalk.co">
            hello@pawwalk.co
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
