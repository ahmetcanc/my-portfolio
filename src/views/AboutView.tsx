import { motion } from "framer-motion";
import { User, Target, Award, Code2, Sparkles } from "lucide-react";
import styles from "@/styles/Home.module.css";

interface AboutViewProps {
  t: any;
}

export default function AboutView({ t }: AboutViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="about" className={styles.aboutSection}>
      {/* Floating SVG Elements */}
      <motion.div
        style={{ position: 'absolute', top: '10%', left: '5%', zIndex: 1 }}
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Code2 size={40} color="var(--primary-color)" opacity={0.3} />
      </motion.div>
      
      <motion.div
        style={{ position: 'absolute', top: '20%', right: '8%', zIndex: 1 }}
        animate={{
          y: [-8, 8, -8],
          x: [-3, 3, -3],
          rotate: [0, -3, 3, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Sparkles size={35} color="var(--secondary-color)" opacity={0.3} />
      </motion.div>

      <motion.div
        style={{ position: 'absolute', bottom: '15%', left: '8%', zIndex: 1 }}
        animate={{
          y: [-6, 6, -6],
          rotate: [0, 8, -8, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <Target size={30} color="var(--accent-color)" opacity={0.3} />
      </motion.div>

      <div className={styles.sectionContent}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <User size={40} style={{ display: 'inline-block', marginRight: '1rem', color: 'var(--primary-color)' }} />
          </motion.span>
          {t.about.title}
        </motion.h2>
        <motion.div 
          className={styles.aboutContent}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className={styles.aboutText} variants={itemVariants}>
            <motion.p variants={itemVariants}>{t.about.description1}</motion.p>
            <motion.p variants={itemVariants}>{t.about.description2}</motion.p>
          </motion.div>
          <motion.div className={styles.aboutStats} variants={itemVariants}>
            <motion.div 
              className={styles.stat}
              variants={statVariants}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(249, 115, 22, 0.1)",
                transition: { duration: 0.2 } 
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <Award size={24} color="var(--primary-color)" style={{ marginBottom: '0.5rem' }} />
              </motion.div>
              <h3>4+</h3>
              <p>{t.about.yearsExperience}</p>
            </motion.div>
            <motion.div 
              className={styles.stat}
              variants={statVariants}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(249, 115, 22, 0.1)",
                transition: { duration: 0.2 } 
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <Target size={24} color="var(--secondary-color)" style={{ marginBottom: '0.5rem' }} />
              </motion.div>
              <h3>7+</h3>
              <p>{t.about.techStackMastery}</p>
            </motion.div>
            <motion.div 
              className={styles.stat}
              variants={statVariants}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(249, 115, 22, 0.1)",
                transition: { duration: 0.2 } 
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <Sparkles size={24} color="var(--accent-color)" style={{ marginBottom: '0.5rem' }} />
              </motion.div>
              <h3>30+</h3>
              <p>{t.about.gpaScore}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 