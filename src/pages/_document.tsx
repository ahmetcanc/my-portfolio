import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#181868ff" />
        <meta name="description" content="Ahmet Can Ceylan - Backend Developer Portfolio. Specialized in Golang, PostgreSQL, and AWS." />
<meta property="og:title" content="Ahmet Can Ceylan - Backend Developer" />
<meta property="og:description" content="Backend Developer specialized in Golang, PostgreSQL, and AWS. Crafting sleek, scalable digital experiences." />
<meta name="twitter:title" content="Ahmet Can Ceylan - Backend Developer" />
<meta name="twitter:description" content="Backend Developer specialized in Golang, PostgreSQL, and AWS." />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
