import '@/styles/globals.css';

export const metadata = {
  title: 'Accumulator Simulator',
  description: 'Simulate accumulator product performance'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-gray-100">{children}</body>
    </html>
  );
}