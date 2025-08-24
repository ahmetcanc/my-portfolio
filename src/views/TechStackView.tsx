import { motion } from "framer-motion";
import { Settings, Zap, Layers, Cpu, Rocket } from "lucide-react";
import { Icon } from '@iconify/react';
import styles from "@/styles/Home.module.css";

interface TechStackViewProps {
  t: any;
  techStack: Array<{ name: string; icon: string; color: string }>;
}

export default function TechStackView({ t, techStack }: TechStackViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" as const
      },
    },
  };

  return (
    <section id="tech" className={styles.techStackSection}>
      {/* Floating SVG Elements */}
      <motion.div
        style={{ position: 'absolute', top: '15%', left: '3%', zIndex: 1 }}
        animate={{
          y: [-15, 15, -15],
          x: [-5, 5, -5],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Settings size={45} color="var(--primary-color)" opacity={0.2} />
      </motion.div>
      
      <motion.div
        style={{ position: 'absolute', top: '10%', right: '5%', zIndex: 1 }}
        animate={{
          y: [-10, 10, -10],
          x: [-3, 3, -3],
          rotate: [0, -8, 8, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <Rocket size={38} color="var(--secondary-color)" opacity={0.2} />
      </motion.div>

      <motion.div
        style={{ position: 'absolute', bottom: '20%', right: '3%', zIndex: 1 }}
        animate={{
          y: [-12, 12, -12],
          rotate: [0, 15, -15, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      >
        <Layers size={42} color="var(--accent-color)" opacity={0.2} />
      </motion.div>

      <motion.div
        style={{ position: 'absolute', bottom: '10%', left: '6%', zIndex: 1 }}
        animate={{
          y: [-8, 8, -8],
          x: [-6, 6, -6],
          rotate: [0, 12, -12, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4.5
        }}
      >
        <Cpu size={35} color="var(--primary-color)" opacity={0.2} />
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
            <Zap size={40} style={{ display: 'inline-block', marginRight: '1rem', color: 'var(--primary-color)' }} />
          </motion.span>
          {t.techStack.title}
        </motion.h2>
        <motion.div 
          className={styles.techGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.map((tech, index) => (
            <motion.div 
              key={tech.name}
              className={styles.techCard}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.1, 
                y: -12,
                backgroundColor: "rgba(249, 115, 22, 0.1)",
                transition: { duration: 0.15 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={{ rotateY: 0, scale: 1 }}
                whileHover={{ 
                  rotateY: 360,
                  scale: 1.2,
                  transition: { duration: 0.6 }
                }}
              >
                <Icon icon={tech.icon} width={32} height={32} style={{ color: tech.color }} />
              </motion.div>
              <motion.span
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1, y: 2 }}
                transition={{ duration: 0.15 }}
              >
                {tech.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 