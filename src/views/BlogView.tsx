import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import rawBlogs from '@/data/blog.json';

interface BlogPostType {
  id: string;
  slug: string;
  date: string;
  title: { tr: string; en: string };
  excerpt: { tr: string; en: string };
  content: { tr: string; en: string };
}

const blogs = rawBlogs as BlogPostType[];

interface BlogViewProps {
  t: any;
  language: string;
}

export default function BlogView({ t, language }: BlogViewProps) {
  const currentLang = (language === 'en' ? 'en' : 'tr') as 'tr' | 'en';
  
  const [showAll, setShowAll] = useState(false);
  const displayedBlogs = showAll ? blogs : blogs.slice(0, 3);
  const hasMorePosts = blogs.length > 3;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <section id="blog" className={styles.aboutSection} style={{ minHeight: 'auto', paddingBottom: '4rem' }}>
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
            <BookOpen size={40} style={{ display: 'inline-block', marginRight: '1rem', color: 'var(--primary-color)' }} />
          </motion.span>
          {t?.nav?.blog || (currentLang === 'en' ? 'Latest Posts' : 'Son Yazılarım')}
        </motion.h2>

        <motion.div 
          className={styles.aboutContent} 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence>
            {displayedBlogs.map((blog) => (
              <motion.div 
                key={blog.id} 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout 
              >
                <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <motion.div 
                    className={styles.stat}
                    style={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      padding: '2rem'
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      backgroundColor: "rgba(249, 115, 22, 0.05)",
                      transition: { duration: 0.2 } 
                    }}
                  >
                    <span style={{ color: 'var(--secondary-color)', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'monospace' }}>
                      {blog.date}
                    </span>
                    
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                      {blog.title[currentLang]}
                    </h3>
                    
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', flexGrow: 1 }}>
                      {blog.excerpt[currentLang]}
                    </p>
                    
                    <span style={{ color: 'var(--primary-color)', fontSize: '0.9rem', marginTop: '1.5rem', fontWeight: 500 }}>
                      {currentLang === 'en' ? 'Read More →' : 'Devamını Oku →'}
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMorePosts && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                border: '1px solid var(--primary-color)',
                color: 'var(--primary-color)',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(249, 115, 22, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {showAll 
                ? (currentLang === 'en' ? 'Show Less' : 'Daha Az Göster') 
                : (currentLang === 'en' ? 'View All Posts' : 'Tüm Yazıları Gör')}
              {showAll ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </motion.div>
        )}
        
      </div>
    </section>
  );
}
