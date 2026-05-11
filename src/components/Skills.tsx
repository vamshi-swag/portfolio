import styles from './Skills.module.css';

const skillCategories = [
  {
    title: "GenAI & LLMs",
    skills: ["RAG", "Prompt Engineering", "CrewAI", "LangGraph", "LangChain", "LlamaIndex"]
  },
  {
    title: "Languages & Backend",
    skills: ["Python", "FastAPI", "REST APIs"]
  },
  {
    title: "Vector DBs & Search",
    skills: ["ChromaDB", "FAISS", "Semantic Search"]
  },
  {
    title: "Cloud & Deployment",
    skills: ["Azure (OpenAI, AI Search)", "AWS (S3, EC2)", "Docker"]
  },
  {
    title: "Computer Vision & Tools",
    skills: ["OpenCV", "YOLO", "TensorFlow Lite", "Git", "GitHub", "Streamlit"]
  }
];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <h2 className="section-title">Technical <span>Skills</span></h2>
      <div className={styles.grid}>
        {skillCategories.map((category, idx) => (
          <div key={idx} className={styles.categoryCard}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <ul className={styles.skillList}>
              {category.skills.map((skill, sIdx) => (
                <li key={sIdx} className={styles.skillItem}>
                  <span className={styles.bullet}></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
