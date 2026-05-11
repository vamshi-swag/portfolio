'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.placeholder}></div>;
  }

  return (
    <button
      className={styles.toggleBtn}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle Theme"
    >
      <div className={styles.iconWrapper}>
        {theme === 'dark' ? (
          <Sun className={styles.icon} size={20} />
        ) : (
          <Moon className={styles.icon} size={20} />
        )}
      </div>
    </button>
  );
}
