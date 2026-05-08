"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "success" | "error" | "rate-limit";

const successMessage = "Thanks, you are on the list. Check your inbox to confirm your sign-up.";
const errorMessage = "Something went wrong. Try again, or email hello@pawwalk.co.";
const rateLimitMessage = "Too many attempts. Wait a minute and try again.";

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function RepeatedEmailCapture() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusMessage =
    status === "success"
      ? successMessage
      : status === "rate-limit"
        ? rateLimitMessage
        : status === "error"
          ? errorMessage
          : "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          consent,
          source: "footer",
        }),
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
      setIsSubmitting(false);
    }
  }

  return (
    <motion.section
      className="repeated-email-capture"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      aria-labelledby="repeated-email-capture-title"
    >
      <div className="capture-shell">
        <div className="capture-panel">
          <motion.h2
            id="repeated-email-capture-title"
            className="capture-title"
            variants={textVariants}
          >
            Get priority booking
          </motion.h2>
          <motion.p className="capture-subhead" variants={textVariants}>
            Join the first wave and reserve a spot in your neighborhood.
          </motion.p>
          <motion.form
            className="capture-form"
            onSubmit={handleSubmit}
            variants={formVariants}
            aria-describedby={statusMessage ? "repeated-email-capture-status" : undefined}
          >
            <div className="capture-form-row">
              <label className="sr-only" htmlFor="repeated-email-capture-email">
                Email address
              </label>
              <input
                id="repeated-email-capture-email"
                className="capture-input"
                name="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                disabled={isSubmitting}
              />
              <motion.button
                className="capture-submit"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                Get early access
              </motion.button>
            </div>
            <label className="capture-consent" htmlFor="repeated-email-capture-consent">
              <input
                id="repeated-email-capture-consent"
                className="capture-checkbox"
                name="consent"
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                required
                disabled={isSubmitting}
              />
              <span>
                I agree to receive emails from PawWalk and accept the{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </span>
            </label>
            {statusMessage ? (
              <p
                id="repeated-email-capture-status"
                className="capture-status"
                role={status === "success" ? "status" : "alert"}
                aria-live="polite"
              >
                {statusMessage}
              </p>
            ) : null}
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}
