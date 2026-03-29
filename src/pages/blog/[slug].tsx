import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import rawBlogs from '@/data/blog.json';
import styles from '@/styles/Home.module.css';

// TypeScript'e verinin şemasını öğretiyoruz
interface BlogPostType {
  id: string;
  slug: string;
  date: string;
  title: { tr: string; en: string };
  excerpt: { tr: string; en: string };
  content: { tr: string; en: string };
}

// Boş JSON dosyasını zorla bu tipe çeviriyoruz
const blogs = rawBlogs as BlogPostType[];

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  
  // Şimdilik varsayılan dili TR yapıyoruz
  const currentLang = 'tr'; 

  const post = blogs.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className={styles.container} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: 'var(--text-primary)' }}>
        <h2>Yazı bulunamadı / Post not found</h2>
      </div>
    );
  }

  return (
    <div className={styles.container} style={{ minHeight: '100vh', padding: '4rem 0' }}>
      <Head>
        <title>{post.title[currentLang]} - Can.dev Blog</title>
      </Head>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--primary-color)', textDecoration: 'none', marginBottom: '3rem', fontWeight: 500 }}>
          <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} />
          Ana Sayfaya Dön
        </Link>

        <article>
          <header style={{ marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--secondary-color)', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>
              <Calendar size={16} style={{ marginRight: '0.5rem' }} />
              {post.date}
            </div>
              <h1 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1.5rem', lineHeight: 1.2, fontWeight: 'bold' }}>
                {post.title[currentLang]}
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>
              {post.excerpt[currentLang]}
            </p>
          </header>

          <div style={{ color: 'var(--text-primary)', lineHeight: 1.8, fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
            {post.content[currentLang]}
          </div>
        </article>
      </main>
    </div>
  );
}