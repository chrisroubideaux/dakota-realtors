import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import '@/styles/cards.css';
import '@/styles/form.css';
import '@/styles/hero.css';
import '@/styles/modal.css';
import BootstrapClient from '@/components/utils/BootstrapClient';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
