"use client";

import { motion } from "framer-motion";
import ProjectImage from "@/app/components/ProjectImage";

const sectionMotion = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const quoteMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: "easeOut" },
  },
};

const secondaryListMotion = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const imageMotion = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.72, ease: "easeOut", delay: 0.18 },
  },
};

export default function TestimonialStrip() {
  return (
    <motion.section
      className="testimonial-strip"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      variants={sectionMotion}
    >
      <div className="testimonial-shell">
        <motion.div
          className="testimonial-media"
          aria-label="Leash looped over a mid-century chair, brass tag visible."
          variants={imageMotion}
        >
          <ProjectImage id="social_proof" className="testimonial-image" />
        </motion.div>

        <div className="testimonial-content">
          {/* Placeholder testimonials approved for early access launch, replace with real quotes when available. */}
          <motion.figure variants={quoteMotion}>
            <blockquote className="testimonial-quote-primary">
              “Booking a walk became part of my morning routine. Reliable, thoughtful, and on time.”
            </blockquote>
            <figcaption className="testimonial-attribution">Maya, Williamsburg</figcaption>
          </motion.figure>

          <motion.div className="testimonial-secondary-list" variants={secondaryListMotion}>
            <motion.figure className="testimonial-secondary-item" variants={quoteMotion}>
              <blockquote className="testimonial-quote-secondary">
                “I loved getting the photo updates. Small detail, big peace of mind.”
              </blockquote>
              <figcaption className="testimonial-attribution">Daniel, Park Slope</figcaption>
            </motion.figure>

            <motion.figure className="testimonial-secondary-item" variants={quoteMotion}>
              <blockquote className="testimonial-quote-secondary">
                “PawWalk felt local and trustworthy. Signing up was simple.”
              </blockquote>
              <figcaption className="testimonial-attribution">Priya, Brooklyn Heights</figcaption>
            </motion.figure>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
