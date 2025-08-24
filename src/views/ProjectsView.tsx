import { motion } from "framer-motion";
import { ExternalLink, Folder, Star, GitBranch, Monitor, Github } from "lucide-react";
import styles from "@/styles/Home.module.css";

interface ProjectsViewProps {
  t: any;
  projects: Array<{
    title: string;
    description: string;
    tech: string[];
    image: string;
    github?: string;
    demo?: string;
  }>;
}

export default function ProjectsView({ t, projects }: ProjectsViewProps) {
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

  const projectCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9 
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
    <section id="projects" className={styles.projectsSection}>
      {/* Floating SVG Elements */}
      <motion.div
        style={{ position: 'absolute', top: '8%', left: '4%', zIndex: 1 }}
        animate={{
          y: [-12, 12, -12],
          rotate: [0, 6, -6, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Folder size={42} color="var(--primary-color)" opacity={0.25} />
      </motion.div>
      
      <motion.div
        style={{ position: 'absolute', top: '15%', right: '6%', zIndex: 1 }}
        animate={{
          y: [-8, 8, -8],
          x: [-4, 4, -4],
          rotate: [0, -4, 4, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <Star size={36} color="var(--accent-color)" opacity={0.25} />
      </motion.div>

      <motion.div
        style={{ position: 'absolute', bottom: '25%', left: '3%', zIndex: 1 }}
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 8, -8, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      >
        <GitBranch size={38} color="var(--secondary-color)" opacity={0.25} />
      </motion.div>

      <motion.div
        style={{ position: 'absolute', bottom: '10%', right: '4%', zIndex: 1 }}
        animate={{
          y: [-6, 6, -6],
          x: [-2, 2, -2],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      >
        <Monitor size={40} color="var(--primary-color)" opacity={0.25} />
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
            <Folder size={40} style={{ display: 'inline-block', marginRight: '1rem', color: 'var(--primary-color)' }} />
          </motion.span>
          {t.projects.title}
        </motion.h2>
        <motion.div 
          className={styles.projectsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              className={styles.projectCard}
              variants={projectCardVariants}
              whileHover={{ 
                y: -15,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className={styles.projectImage}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className={styles.projectImageElement}
                />
              </motion.div>
              <motion.div 
                className={styles.projectContent}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.h3
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                </motion.h3>
                <p>{project.description}</p>
                <motion.div 
                  className={styles.projectTech}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {project.tech.map((tech, techIndex) => (
                    <motion.span 
                      key={tech} 
                      className={styles.techTag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.4 + techIndex * 0.1 
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div 
                  className={styles.projectActions}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectButton}
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Github size={16} />
                      GitHub
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectButton}
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ExternalLink size={16} />
                      {t.projects.viewDemo || "View Demo"}
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 