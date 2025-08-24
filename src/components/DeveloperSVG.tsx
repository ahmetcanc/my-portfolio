import { motion } from "framer-motion";
import styles from "@/styles/DeveloperSVG.module.css";

export default function DeveloperSVG() {
  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className={styles.svgContainer}>
      <motion.svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className={styles.developerSvg}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Background Circle */}
        <motion.circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* Developer Character */}
        <motion.g
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Head */}
          <motion.circle
            cx="200"
            cy="150"
            r="25"
            fill="#FFD93D"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          />
          
          {/* Body */}
          <motion.rect
            x="180"
            y="175"
            width="40"
            height="60"
            rx="20"
            fill="#4A90E2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          
          {/* Arms */}
          <motion.rect
            x="160"
            y="180"
            width="15"
            height="30"
            rx="7"
            fill="#4A90E2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          />
          <motion.rect
            x="225"
            y="180"
            width="15"
            height="30"
            rx="7"
            fill="#4A90E2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          />
          
          {/* Legs */}
          <motion.rect
            x="185"
            y="235"
            width="12"
            height="40"
            rx="6"
            fill="#2E4057"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          />
          <motion.rect
            x="203"
            y="235"
            width="12"
            height="40"
            rx="6"
            fill="#2E4057"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          />
        </motion.g>

        {/* Laptop */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <rect x="160" y="280" width="80" height="45" rx="4" fill="#2C3E50" />
          <rect x="165" y="285" width="70" height="35" rx="2" fill="#34495E" />
          <rect x="168" y="288" width="64" height="29" rx="1" fill="#1ABC9C" />
          
          {/* Screen content - code lines */}
          <motion.rect
            x="170"
            y="290"
            width="30"
            height="2"
            fill="#E74C3C"
            initial={{ width: 0 }}
            animate={{ width: 30 }}
            transition={{ duration: 1, delay: 2.5 }}
          />
          <motion.rect
            x="170"
            y="295"
            width="45"
            height="2"
            fill="#F39C12"
            initial={{ width: 0 }}
            animate={{ width: 45 }}
            transition={{ duration: 1, delay: 2.7 }}
          />
          <motion.rect
            x="170"
            y="300"
            width="25"
            height="2"
            fill="#9B59B6"
            initial={{ width: 0 }}
            animate={{ width: 25 }}
            transition={{ duration: 1, delay: 2.9 }}
          />
          <motion.rect
            x="170"
            y="305"
            width="35"
            height="2"
            fill="#3498DB"
            initial={{ width: 0 }}
            animate={{ width: 35 }}
            transition={{ duration: 1, delay: 3.1 }}
          />
        </motion.g>

        {/* Floating Elements */}
        <motion.g
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: "200px 200px" }}
        >
          {/* Code Brackets */}
          <motion.text
            x="100"
            y="120"
            fontSize="24"
            fill="url(#gradient2)"
            fontFamily="monospace"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {"</>"}
          </motion.text>
          
          <motion.text
            x="280"
            y="280"
            fontSize="20"
            fill="url(#gradient3)"
            fontFamily="monospace"
            animate={{
              y: [0, -15, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {"{}"}
          </motion.text>
        </motion.g>

        {/* Floating Orbs */}
        <motion.circle
          cx="80"
          cy="200"
          r="8"
          fill="url(#gradient4)"
          animate={{
            x: [0, 15, 0],
            y: [0, -10, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        <motion.circle
          cx="320"
          cy="180"
          r="6"
          fill="url(#gradient5)"
          animate={{
            x: [0, -10, 0],
            y: [0, 12, 0],
            transition: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#4ECDC4" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A8E6CF" />
            <stop offset="100%" stopColor="#7FCDCD" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB6C1" />
            <stop offset="100%" stopColor="#FFA07A" />
          </linearGradient>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#98D8E8" />
            <stop offset="100%" stopColor="#6BB6FF" />
          </linearGradient>
          <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7DC6F" />
            <stop offset="100%" stopColor="#F8C471" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
