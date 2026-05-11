import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.accent}>V</span>amshi
        </Link>
        <ul className={styles.navLinks}>
          <li><Link href="#about" className={styles.link}>About</Link></li>
          <li><Link href="#projects" className={styles.link}>Projects</Link></li>
          <li><Link href="#skills" className={styles.link}>Skills</Link></li>
          <li><Link href="#resume" className={styles.link}>Experience</Link></li>
          <li><Link href="#contact" className={styles.link}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
