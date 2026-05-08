"use client";

import { motion } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const textVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const textChildVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const rowVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * 24,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

export default function FeaturesSection() {
  return (
    <motion.section
      id="features"
      className="features-section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="features-shell">
        <div className="features-intro">
          <p className="features-label">How PawWalk works</p>
          <h2 className="features-heading">How PawWalk works</h2>
          <p className="features-copy">
            Sign up for early access. We open spots in waves, starting in Brooklyn. When your area becomes available, you get priority booking and onboarding instructions.
          </p>
        </div>

        <motion.article
          className="feature-row feature-row-a"
          custom={-1}
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.32 }}
        >
          <motion.div className="feature-text" variants={textVariants}>
            <motion.p className="feature-kicker" variants={textChildVariants}>
              Vetted care
            </motion.p>
            <motion.h3 className="feature-title" variants={textChildVariants}>
              Vetted walkers
            </motion.h3>
            <motion.p className="feature-description" variants={textChildVariants}>
              Background checks, in-person interviews, and local references.
            </motion.p>
          </motion.div>
          <motion.div className="feature-media" variants={imageVariants}>
            <ProjectImage id="feature_1" className="feature-image" />
          </motion.div>
        </motion.article>

        <motion.article
          className="feature-row feature-row-b"
          custom={1}
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.32 }}
        >
          <motion.div className="feature-text" variants={textVariants}>
            <motion.p className="feature-kicker" variants={textChildVariants}>
              Simple scheduling
            </motion.p>
            <motion.h3 className="feature-title" variants={textChildVariants}>
              Flexible scheduling
            </motion.h3>
            <motion.p className="feature-description" variants={textChildVariants}>
              Book walks that fit your week, same-day options when available.
            </motion.p>
          </motion.div>
          <motion.div className="feature-media" variants={imageVariants}>
            <ProjectImage id="feature_2" className="feature-image" />
          </motion.div>
        </motion.article>

        <motion.article
          className="feature-row feature-row-c"
          custom={-1}
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.32 }}
        >
          <motion.div className="feature-text" variants={textVariants}>
            <motion.p className="feature-kicker" variants={textChildVariants}>
              Quiet updates
            </motion.p>
            <motion.h3 className="feature-title" variants={textChildVariants}>
              Photo updates
            </motion.h3>
            <motion.p className="feature-description" variants={textChildVariants}>
              A short photo after every walk so you know your dog is okay.
            </motion.p>
          </motion.div>
          <motion.div className="feature-media" variants={imageVariants}>
            <ProjectImage id="feature_3" className="feature-image" />
          </motion.div>
        </motion.article>
      </div>
    </motion.section>
  );
}