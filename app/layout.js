'use client';
import { useEffect } from 'react';
import '@/styles/globals.css';
//import '@/styles/cards.css';
//import '@/styles/form.css';
//import '@/styles/hero.css';
//import '@/styles/modal.css';
//import '@fortawesome/fontawesome-svg-core/styles.css';

export default function RootLayout({ children }) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
