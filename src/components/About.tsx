import styles from './About.module.css';

export default function About() {
  const highlightWords = (text: string) => {
    return text.split(' ').map((word, index, array) => (
      <span key={index}>
        <span className={styles.hoverWord}>{word}</span>
        {index < array.length - 1 ? ' ' : ''}
      </span>
    ));
  };

  return (
    <section className="section" id="about">
      <h2 className="section-title">About <span>Me</span></h2>
      <div className={styles.container}>
        <div className={styles.textFrame}>
          <p>
            {highlightWords("Hello! I'm Vamshi Neelakantam, a Generative AI Engineer with hands-on experience in building RAG-based applications, LLM-powered systems, and scalable AI pipelines.")}
          </p>
          <p>
            {highlightWords("I specialize in developing end-to-end solutions including FastAPI backends, vector search systems, and cloud deployments (Azure & AWS). I'm a quick learner with strong problem-solving skills, always eager to tackle complex challenges.")}
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.number}>GenAI</span>
              <span className={styles.label}>Focus Area</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.number}>Cloud</span>
              <span className={styles.label}>Azure & AWS</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.number}>Python</span>
              <span className={styles.label}>Primary Stack</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
