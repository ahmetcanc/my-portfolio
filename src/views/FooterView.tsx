import { motion } from "framer-motion";
import styles from "@/styles/Home.module.css";

interface FooterViewProps {
  t: any;
  language: string;
  setLanguage: (lang: string) => void;
}

export default function FooterView({ t, language, setLanguage }: FooterViewProps) {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/ahmetcanc",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/ahmet-can-ceylan",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ];

  const navigationLinks = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "tech", href: "#tech" },
    { key: "projects", href: "#projects" },
    { key: "experience", href: "#experience" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer 
      className={styles.footer}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Background effects */}
      <div className={styles.footerBackground}>
        <div className={styles.footerBubble}></div>
        <div className={styles.footerBubble}></div>
        <div className={styles.footerBubble}></div>
      </div>

      <div className={styles.footerContent}>
        {/* Main content */}
        <motion.div className={styles.footerMain} variants={itemVariants}>
          <motion.div className={styles.footerBrand} variants={itemVariants}>
            <h3 className={styles.footerTitle}>Ahmet Can Ceylan</h3>
            <p className={styles.footerDescription}>
              {t.footer.description}
            </p>
            <div className={styles.footerSocial}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {social.icon}
                  <span className={styles.socialTooltip}>{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div className={styles.footerLinks} variants={itemVariants}>
            <h4 className={styles.footerSectionTitle}>{t.footer.quickLinks}</h4>
            <ul className={styles.footerNav}>
              {navigationLinks.map((link, index) => (
                <motion.li
                  key={link.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <a href={link.href} className={styles.footerNavLink}>
                    {t.nav[link.key]}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className={styles.footerContact} variants={itemVariants}>
            <h4 className={styles.footerSectionTitle}>{t.footer.connect}</h4>
            <div className={styles.footerContactInfo}>
              <motion.a
                href={`mailto:${t.footer.email}`}
                className={styles.footerEmail}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                {t.footer.email}
              </motion.a>
              
              <div className={styles.footerLanguageToggle}>
                <button
                  onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                  className={styles.footerLanguageButton}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
                  </svg>
                  {language.toUpperCase()}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div 
          className={styles.footerBottom}
          variants={itemVariants}
        >
          <motion.p 
            className={styles.footerCopyright}
            variants={itemVariants}
          >
            {t.footer.copyright}
          </motion.p>
          <motion.p 
            className={styles.footerBuiltWith}
            variants={itemVariants}
          >
            {t.footer.builtWith}
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
} 