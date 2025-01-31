import '@/styles/globals.css';

export const metadata = {
  title: 'Accumulator Simulator',
  description: 'Simulate accumulator product performance'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}