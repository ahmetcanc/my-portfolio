import { motion } from "framer-motion";
import { Settings, Trophy, Snowflake, Blocks, User, Gamepad2, Film, Music, Dumbbell, Target, Plane } from "lucide-react";
import styles from "@/styles/Home.module.css";

const iconMap: Record<string, any> = {
  Settings,
  Trophy,
  Snowflake,
  Blocks,
  User,
  Gamepad2,
  Film,
  Music,
  Dumbbell,
  Target,
  Plane
};

interface HobbyItem {
  id: number;
  title: {
    en: string;
    tr: string;
  };
  description: {
    en: string;
    tr: string;
  };
  icon: string;
  gradient: string;
}

interface HobbiesViewProps {
  t: any;
  hobbies: HobbyItem[];
}

export default function HobbiesView({ t, hobbies }: HobbiesViewProps) {
  // Get current language from translations object
  const currentLang = t.nav.home === 'Ana Sayfa' ? 'tr' : 'en';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const
      },
    },
  };

  return (
    <section id="hobbies" className={styles.hobbiesSection}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sectionHeader}
        >
          <h2 className={styles.sectionTitle}>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Target size={40} style={{ display: 'inline-block', marginRight: '1rem', color: 'var(--primary-color)' }} />
            </motion.span>
            {t.hobbies.title}
          </h2>
          <p className={styles.sectionSubtitle}>{t.hobbies.subtitle}</p>
        </motion.div>

        <motion.div 
          className={styles.hobbiesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {hobbies.map((hobby, index) => {
            const IconComponent = iconMap[hobby.icon];
            
            return (
              <motion.div
                key={hobby.id}
                className={styles.hobbyCard}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.08,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: hobby.gradient,
                }}
              >
                <motion.div 
                  className={styles.hobbyCardContent}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div 
                    className={styles.hobbyIcon}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.4,
                      type: "spring",
                      stiffness: 200 
                    }}
                    whileHover={{ 
                      rotate: 10,
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {IconComponent && <IconComponent size={32} />}
                  </motion.div>
                  <motion.h3 
                    className={styles.hobbyTitle}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    whileHover={{ x: 5 }}
                  >
                    {currentLang === 'tr' ? hobby.title.tr : hobby.title.en}
                  </motion.h3>
                  <motion.p 
                    className={styles.hobbyDescription}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    {currentLang === 'tr' ? hobby.description.tr : hobby.description.en}
                  </motion.p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
