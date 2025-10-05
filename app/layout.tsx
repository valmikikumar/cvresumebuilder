import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'ResumeShala - Making dream resumes simple and free',
  description: 'Create ATS-friendly, professional, and mobile-responsive resumes in minutes. Free resume builder with AI-powered features for job seekers.',
  keywords: 'resume builder, CV maker, ATS friendly resume, professional resume, free resume templates',
  authors: [{ name: 'ResumeShala Team' }],
  openGraph: {
    title: 'ResumeShala - Making dream resumes simple and free',
    description: 'Create ATS-friendly, professional, and mobile-responsive resumes in minutes.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeShala - Making dream resumes simple and free',
    description: 'Create ATS-friendly, professional, and mobile-responsive resumes in minutes.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
