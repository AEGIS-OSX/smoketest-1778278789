"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import ProjectImage from "@/app/components/ProjectImage";

type FormStatus = "idle" | "success" | "error" | "rate-limit";

const statusMessages: Record<Exclude<FormStatus, "idle">, string> = {
  "success": "Thanks, you are on the list. Check your inbox to confirm your sign-up.",
  "error": "Something went wrong. Try again, or email hello@pawwalk.co.",
  "rate-limit": "Too many attempts. Wait a minute and try again."
};

const childMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, consent })
      });

      if (response.status === 429) {
        setStatus("rate-limit");
        return;
      }

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <motion.section
      className="hero-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="hero-nav">
        <Link className="hero-brand" href="/" aria-label="PawWalk home">
          PawWalk
        </Link>
        <div className="hero-nav-links">
          <Link href="#features">See features</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>

      <div className="hero-shell">
        <div className="hero-content">
          <motion.p className="hero-supporting-line" {...childMotion} transition={{ ...childMotion.transition, delay: 0.05 }}>
            First 100 signups receive priority booking and an introductory offer.
          </motion.p>
          <motion.h1 className="hero-title" {...childMotion} transition={{ ...childMotion.transition, delay: 0.15 }}>
            PawWalk: Vetted dog walkers, on your schedule
          </motion.h1>
          <motion.p className="hero-subhead" {...childMotion} transition={{ ...childMotion.transition, delay: 0.25 }}>
            Join early access for priority booking in Brooklyn, photo updates after every walk, and clear, upfront pricing.
          </motion.p>
          <motion.form className="hero-form" onSubmit={handleSubmit} {...childMotion} transition={{ ...childMotion.transition, delay: 0.35 }}>
            <div className="hero-form-row">
              <input
                className="hero-input"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                disabled={isPending}
                aria-label="Email address"
              />
              <motion.button
                className="hero-submit"
                type="submit"
                disabled={isPending || !consent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get early access
              </motion.button>
            </div>
            <label className="hero-consent">
              <input
                className="hero-checkbox"
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                required
                disabled={isPending}
              />
              <span>
                I agree to receive emails from PawWalk and accept the <Link href="/privacy">Privacy Policy</Link>.
              </span>
            </label>
            <p className="hero-status" aria-live="polite">
              {status === "idle" ? "" : statusMessages[status]}
            </p>
          </motion.form>
          <motion.div {...childMotion} transition={{ ...childMotion.transition, delay: 0.45 }}>
            <Link className="hero-secondary-link" href="#features">
              See features
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero-media"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          aria-label="Editorial still life of a brass leash clasp on matte charcoal, cropped to the right of the headline."
        >
          <ProjectImage id="hero" className="hero-image" />
        </motion.div>
      </div>
    </motion.section>
  );
}
