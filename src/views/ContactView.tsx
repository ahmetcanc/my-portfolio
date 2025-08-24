import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle, Send, Phone } from "lucide-react";
import styles from "@/styles/Home.module.css";

interface ContactViewProps {
  t: any;
}

export default function ContactView({ t }: ContactViewProps) {
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

  const formVariants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const
      },
    },
  };

  const socialVariants = {
    hidden: { 
      opacity: 0, 
      x: 50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const
      },
    },
  };

  const inputVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" as const
      },
    },
  };

  return (
    <section id="contact" className={styles.contactSection}>
      {/* Floating SVG Elements */}
      <motion.div
        style={{ position: 'absolute', top: '10%', left: '3%', zIndex: 1 }}
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <MessageCircle size={40} color="var(--primary-color)" opacity={0.2} />
      </motion.div>
      
      <motion.div
        style={{ position: 'absolute', top: '25%', right: '5%', zIndex: 1 }}
        animate={{
          y: [-8, 8, -8],
          x: [-2, 2, -2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <Send size={36} color="var(--secondary-color)" opacity={0.2} />
      </motion.div>

      <motion.div
        style={{ position: 'absolute', bottom: '20%', left: '4%', zIndex: 1 }}
        animate={{
          y: [-6, 6, -6],
          rotate: [0, 8, -8, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      >
        <Phone size={34} color="var(--accent-color)" opacity={0.2} />
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
            <MessageCircle size={40} style={{ display: 'inline-block', marginRight: '1rem', color: 'var(--primary-color)' }} />
          </motion.span>
          {t.contact.title}
        </motion.h2>
        <motion.div 
          className={styles.contactContent}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className={styles.contactForm}
            variants={formVariants}
          >
            <motion.div className={styles.formGroup} variants={inputVariants}>
              <motion.input 
                type="text" 
                placeholder={t.contact.name}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <motion.div className={styles.formGroup} variants={inputVariants}>
              <motion.input 
                type="email" 
                placeholder={t.contact.email}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <motion.div className={styles.formGroup} variants={inputVariants}>
              <motion.textarea 
                placeholder={t.contact.message} 
                rows={5}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <motion.button 
              className={styles.submitButton}
              variants={inputVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 12px 30px rgba(249, 115, 22, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {t.contact.sendMessage}
            </motion.button>
          </motion.div>
          <motion.div 
            className={styles.socialLinks}
            variants={socialVariants}
          >
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t.contact.connectWithMe}
            </motion.h3>
            <motion.div 
              className={styles.socialIcons}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.a 
                href="https://github.com/ahmetcanc/" 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={{ 
                  scale: 1.3,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={24} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/ahmet-can-ceylan/" 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                whileHover={{ 
                  scale: 1.3,
                  rotate: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a 
                href="mailto:ahmetcanceylann81@gmail.com" 
                className={styles.socialIcon}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                whileHover={{ 
                  scale: 1.3,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={24} />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 