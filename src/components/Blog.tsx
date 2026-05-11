import styles from './Blog.module.css';

const posts = [
  {
    id: 1,
    title: "The Future of LLMs in Enterprise Production",
    date: "Oct 15, 2023",
    summary: "Exploring the challenges and solutions for deploying Large Language Models at scale in corporate environments.",
    link: "#"
  },
  {
    id: 2,
    title: "Optimizing Inference with TensorRT",
    date: "Aug 22, 2023",
    summary: "A deep dive into reducing latency and improving throughput for real-time computer vision applications.",
    link: "#"
  },
  {
    id: 3,
    title: "Understanding Attention Mechanisms",
    date: "Jun 05, 2023",
    summary: "Breaking down the math and intuition behind the transformer architecture that powers modern AI.",
    link: "#"
  }
];

export default function Blog() {
  return (
    <section className="section" id="blog">
      <h2 className="section-title">Latest <span>Thoughts</span></h2>
      <div className="content-frame">
        <div className={styles.grid}>
          {posts.map(post => (
            <article key={post.id} className={styles.postCard}>
              <span className={styles.date}>{post.date}</span>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.summary}>{post.summary}</p>
              <a href={post.link} className={styles.readMore}>Read Article &rarr;</a>
            </article>
          ))}
        </div>
        <div className={styles.viewAll}>
          <a href="#" className={styles.viewAllBtn}>View All Posts</a>
        </div>
      </div>
    </section>
  );
}
