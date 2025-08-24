import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import styles from '@/styles/CodeTypingAnimation.module.css';

interface CodeLine {
  text: string;
  delay: number;
  typeDelay: number;
}

interface CodeTypingAnimationProps {
  onComplete?: () => void;
  autoStart?: boolean;
}

export default function CodeTypingAnimation({ onComplete, autoStart = true }: CodeTypingAnimationProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const codeLines: CodeLine[] = [
    { text: 'Dev := struct.Developer {', delay: 0, typeDelay: 50 },
    { text: '  name: "Ahmet Can Ceylan",', delay: 200, typeDelay: 40 },
    { text: '  role: "Backend Developer",', delay: 400, typeDelay: 45 },
    { text: '  stack: [', delay: 600, typeDelay: 50 },
    { text: '    "Golang",', delay: 800, typeDelay: 35 },
    { text: '    ".NET MVC",', delay: 1000, typeDelay: 35 },
    { text: '    "PostgreSQL"', delay: 1200, typeDelay: 35 },
    { text: '  ],', delay: 1400, typeDelay: 50 },
    { text: '  passion: "Building scalable Backend systems"', delay: 1600, typeDelay: 40 },
    { text: '};', delay: 1800, typeDelay: 100 }
  ];

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter effect function
  const startTyping = useCallback(async () => {
    setIsTyping(true);
    setCurrentLine(0);
    setCurrentChar(0);
    
    for (let lineIndex = 0; lineIndex < codeLines.length; lineIndex++) {
      const line = codeLines[lineIndex];
      
      // Wait for line delay
      await new Promise(resolve => setTimeout(resolve, line.delay));
      setCurrentLine(lineIndex);
      
      // Type each character in the line
      for (let charIndex = 0; charIndex <= line.text.length; charIndex++) {
        setCurrentChar(charIndex);
        await new Promise(resolve => setTimeout(resolve, line.typeDelay));
      }
    }
    
    setIsTyping(false);
    onComplete?.();
  }, [codeLines, onComplete]);

  // Initial typing effect
  useEffect(() => {
    if (autoStart) {
      startTyping();
    }
  }, [autoStart, startTyping]);

  // Hover replay effect
  useEffect(() => {
    if (isHovered && !isTyping) {
      const timeout = setTimeout(() => {
        startTyping();
      }, 500); // Small delay before replay

      return () => clearTimeout(timeout);
    }
  }, [isHovered, isTyping, startTyping]);

  // Container animation
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    });
  }, [controls]);

  const getDisplayedText = (lineIndex: number) => {
    if (lineIndex < currentLine) {
      return codeLines[lineIndex].text;
    }
    if (lineIndex === currentLine) {
      return codeLines[lineIndex].text.slice(0, currentChar);
    }
    return '';
  };

  return (
    <motion.div
      className={styles.codeContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <div className={styles.codeHeader}>
        <div className={styles.codeButtons}>
          <div className={styles.codeButton}></div>
          <div className={styles.codeButton}></div>
          <div className={styles.codeButton}></div>
        </div>
        <div className={styles.codeTitle}>developer.js</div>
        {isHovered && !isTyping && (
          <motion.div 
            className={styles.replayIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Replay
          </motion.div>
        )}
      </div>
      
      <div className={styles.codeContent}>
        {codeLines.map((line, index) => (
          <div key={index} className={styles.codeLine}>
            <span className={styles.lineNumber}>{index + 1}</span>
            <span className={styles.codeText}>
              {getDisplayedText(index)}
              {index === currentLine && isTyping && showCursor && (
                <span className={styles.cursor}>|</span>
              )}
            </span>
          </div>
        ))}
        
        {/* Blinking cursor at the end when typing is complete */}
        {!isTyping && currentLine >= codeLines.length - 1 && showCursor && (
          <div className={styles.codeLine}>
            <span className={styles.lineNumber}></span>
            <span className={styles.cursor}>|</span>
          </div>
        )}
      </div>
      
      {/* Background glow effect */}
      <div className={styles.codeGlow}></div>
    </motion.div>
  );
} 