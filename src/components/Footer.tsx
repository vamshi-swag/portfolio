import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>Vamshi Neelakantam</span>
            <p className={styles.tagline}>Generative AI Engineer building scalable, real-world AI solutions.</p>
          </div>
          <div className={styles.links}>
            <a href="https://github.com/vamshi-swag" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
            <a href="https://linkedin.com/in/vamshi-neelakantam" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
            <a href="mailto:nvamsi630@gmail.com" className={styles.link}>Email</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Vamshi Neelakantam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
