'use client';
import { useState } from 'react';
import styles from './Resume.module.css';

const experienceData = [
  {
    id: 1,
    role: "B.Tech in Artificial Intelligence",
    company: "Vidya Jyothi Institute of Technology",
    date: "2022 - 2025",
    description: "Specialized in Artificial Intelligence, focusing on modern machine learning techniques and practical application development.",
    className: "node1"
  },
  {
    id: 2,
    role: "Salesforce Developer Intern",
    company: "Salesforce | Hyderabad",
    date: "May 2024 - Jun 2024",
    description: "Developed Apex classes and Lightning components. Customized CRM workflows for enterprise applications.",
    className: "node2"
  },
  {
    id: 3,
    role: "Generative AI Developer Intern",
    company: "StarUPS | Hyderabad",
    date: "Sep 2024 - Mar 2025",
    description: "Built RAG-based document retrieval systems using LangChain and ChromaDB. Developed real-time AI chatbot interfaces and designed scalable AI pipelines.",
    className: "node3"
  }
];

export default function Resume() {
  const [selectedExp, setSelectedExp] = useState<typeof experienceData[0] | null>(null);

  return (
    <section className="section" id="resume">
      <h2 className="section-title">Experience & <span>Education</span></h2>

      <div className="content-frame">
        <div className={styles.chartWrapper}>
        <div className={styles.yAxis}>
          <span>2030</span>
          <span>2028</span>
          <span>2026</span>
          <span>2024</span>
          <span>2022</span>
        </div>

        <div className={styles.graphContainer}>
          {/* SVG Graph Line */}
          <svg className={styles.graphLine} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="lineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Past/Present Line */}
            <path
              d="M 0 100 L 10 81 L 40 70 L 70 65"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              filter="url(#glow)"
              className={styles.pathAnimation}
            />
            {/* Future Trajectory */}
            <path
              d="M 70 65 L 100 0"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="4,4"
              vectorEffect="non-scaling-stroke"
              className={styles.pathAnimationDelayed}
            />
          </svg>

          {/* Nodes */}
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className={`${styles.node} ${styles[exp.className]}`}
              onClick={() => setSelectedExp(exp)}
            >
              <div className={styles.nodeDot}></div>
              <div className={styles.nodeTitle}>
                <span className={styles.nodeDate}>{exp.date}</span>
                <h3 className={styles.roleTitle}>{exp.role}</h3>
              </div>
            </div>
          ))}

          {/* X Axis */}
          <div className={styles.xAxis}>
            <span>Experience</span>
          </div>
        </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedExp && (
        <div className={styles.modalOverlay} onClick={() => setSelectedExp(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedExp(null)}>&times;</button>
            <h3 className={styles.modalRole}>{selectedExp.role}</h3>
            <span className={styles.modalCompany}>{selectedExp.company} | {selectedExp.date}</span>
            <p className={styles.modalDesc}>{selectedExp.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
