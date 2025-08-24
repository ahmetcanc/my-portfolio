import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, TrendingUp, Building } from "lucide-react";
import { useEffect } from "react";
import styles from "@/styles/Home.module.css";

interface ExperienceViewProps {
  t: any;
  experience: Array<{
    company: string;
    location?: string;
    role: string;
    period: string;
    description: string;
    highlights?: string[];
  }>;
}

export default function ExperienceView({ t, experience }: ExperienceViewProps) {
  // Force re-render when experience data changes
  useEffect(() => {
    // Component will re-render when experience data changes
  }, [experience]);

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const timelineItemVariants = {
    hidden: { 
      opacity: 0, 
      x: 0,
      y: 50 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const
      },
    },
  };

  return (
    <section id="experience" className={styles.experienceSection}>
      {/* Floating SVG Elements */}
      <motion.div
        style={{ position: 'absolute', top: '12%', left: '5%', zIndex: 1 }}
        animate={{
          y: [-8, 8, -8],
          rotate: [0, 4, -4, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Building size={38} color="var(--primary-color)" opacity={0.2} />
      </motion.div>
      
      <motion.div
        style={{ position: 'absolute', top: '20%', right: '4%', zIndex: 1 }}
        animate={{
          y: [-10, 10, -10],
          x: [-3, 3, -3]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <TrendingUp size={35} color="var(--secondary-color)" opacity={0.2} />
      </motion.div>

      <motion.div
        style={{ position: 'absolute', bottom: '15%', left: '6%', zIndex: 1 }}
        animate={{
          y: [-6, 6, -6],
          rotate: [0, 6, -6, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      >
        <Calendar size={32} color="var(--accent-color)" opacity={0.2} />
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
            <Briefcase size={40} style={{ display: 'inline-block', marginRight: '1rem', color: 'var(--primary-color)' }} />
          </motion.span>
          {t.experience.title}
        </motion.h2>
        <motion.div 
          className={styles.timeline}
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experience && experience.length > 0 ? experience.map((exp, index) => (
            <motion.div 
              key={`${exp.company}-${index}`}
              className={styles.timelineItem}
              variants={timelineItemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className={styles.timelineContent}
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  transition: { duration: 0.2 }
                }}
              >
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {exp.role}
                </motion.h3>
                <motion.h4
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {exp.company}
                  {exp.location && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9em', marginLeft: '0.5rem' }}>
                      <MapPin size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                      {exp.location}
                    </span>
                  )}
                </motion.h4>
                <motion.p 
                  className={styles.timelinePeriod}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Calendar size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  {exp.period}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {exp.description}
                </motion.p>
                {exp.highlights && (
                  <motion.ul 
                    className={styles.experienceHighlights}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx}>
                        <TrendingUp size={12} style={{ marginRight: '0.5rem', color: 'var(--primary-color)' }} />
                        {highlight}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            </motion.div>
          )) : (
            <div>No experience data available</div>
          )}
        </motion.div>
      </div>
    </section>
  );
} 