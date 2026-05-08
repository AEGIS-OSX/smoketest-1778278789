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
  const [consentError, setConsentError] = useState("");

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
    setStatus("idle");

    if (!consent) {
      setConsentError("I agree to receive emails from PawWalk and accept the Privacy Policy.");
      return;
    }

    setConsentError("");
    setIsSubmitting(true);

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
      <div className="repeated-email-shell">
        <motion.div className="repeated-email-copy" variants={textVariants}>
          <h2 id="repeated-email-capture-title" className="repeated-email-title">
            Get priority booking
          </h2>
          <p className="repeated-email-subhead">
            Join the first wave and reserve a spot in your neighborhood.
          </p>
        </motion.div>

        <motion.form className="email-form" variants={formVariants} onSubmit={handleSubmit} noValidate>
          <div className="email-form-row">
            <input
              className="email-input"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              aria-label="your@email.com"
            />
            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Get early access" : "Get early access"}
            </button>
          </div>

          <div>
            <div className="consent-row">
              <input
                id="footer-consent"
                className="consent-checkbox"
                type="checkbox"
                checked={consent}
                onChange={(event) => {
                  setConsent(event.target.checked);
                  if (event.target.checked) {
                    setConsentError("");
                  }
                }}
                required
                aria-describedby={consentError ? "footer-consent-error" : undefined}
              />
              <label className="consent-label" htmlFor="footer-consent">
                I agree to receive emails from PawWalk and accept the <Link href="/privacy">Privacy Policy</Link>.
              </label>
            </div>
            {consentError ? (
              <p id="footer-consent-error" className="form-error" role="alert">
                {consentError}
              </p>
            ) : null}
          </div>

          {statusMessage ? (
            <p className="form-message" role="status">
              {statusMessage}
            </p>
          ) : null}
        </motion.form>
      </div>
    </motion.section>
  );
}