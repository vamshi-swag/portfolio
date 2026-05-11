'use client';
import { useState } from 'react';
import styles from './Projects.module.css';

const projects = [
  {
    id: 1,
    title: "Enterprise RAG Knowledge Assistant",
    description: "Built end-to-end RAG pipeline for document-based question answering with semantic search and an interactive UI deployed on cloud platforms.",
    longDescription: "An advanced, enterprise-grade Retrieval-Augmented Generation (RAG) system designed to securely ingest, index, and query thousands of internal company documents. The system uses advanced chunking strategies and hybrid search to guarantee highly accurate, hallucination-free answers with full source citations.",
    mainTopics: [
      "Semantic Search & Vector Embeddings using ChromaDB",
      "LLM Orchestration with LangChain & OpenAI GPT-4",
      "FastAPI Backend with asynchronous task queues",
      "Containerized deployment using Docker",
      "Interactive conversational UI with Streamlit"
    ],
    tech: ["LangChain", "FastAPI", "ChromaDB", "OpenAI", "Streamlit", "Docker"],
    link: "#"
  },
  {
    id: 2,
    title: "Scalable RAG System on Azure",
    description: "Designing enterprise-grade RAG architecture implementing hybrid retrieval (vector + keyword) and building scalable APIs.",
    longDescription: "Architected a highly available, cloud-native generative AI solution on Microsoft Azure. By combining vector similarity search with traditional BM25 keyword search (hybrid retrieval), this system significantly improves retrieval accuracy for industry-specific jargon and sparse queries.",
    mainTopics: [
      "Azure AI Search configuration for Hybrid Retrieval",
      "Azure OpenAI Service integration for secure model deployment",
      "Secure document storage and processing via Azure Blob Storage",
      "Scalable microservices architecture using FastAPI",
      "Role-Based Access Control (RBAC) implementation"
    ],
    tech: ["Azure OpenAI", "AI Search", "Blob Storage", "FastAPI"],
    link: "#"
  },
  {
    id: 3,
    title: "ForeSight - AI Assistive Vision System",
    description: "Developed real-time object detection system for visually impaired users with integrated audio-based feedback for navigation assistance.",
    longDescription: "A portable, edge-AI solution aimed at helping visually impaired individuals navigate complex environments. Utilizing a Raspberry Pi and camera module, ForeSight runs optimized computer vision models to detect obstacles, signs, and people in real-time, delivering immediate audio alerts to the user.",
    mainTopics: [
      "Real-time Edge AI computing on Raspberry Pi",
      "YOLOv8 object detection model optimization",
      "OpenCV video stream processing pipelines",
      "Text-to-Speech (TTS) integration for audio feedback",
      "Low-latency hardware-software integration"
    ],
    tech: ["YOLO", "OpenCV", "Raspberry Pi"],
    link: "#"
  },
  {
    id: 4,
    title: "AI Knowledge Copilot",
    description: "Built a multi-agent system for automation and reasoning workflows, enabling collaborative AI task execution.",
    longDescription: "A cutting-edge multi-agent AI workflow automation tool. Instead of relying on a single LLM prompt, this system orchestrates multiple specialized AI agents that collaborate, critique, and synthesize information to complete complex research and coding tasks autonomously.",
    mainTopics: [
      "Multi-Agent Orchestration using CrewAI",
      "Stateful agent workflows with LangGraph",
      "Tool-use and API integration for autonomous agents",
      "Iterative reasoning and self-correction loops",
      "Custom agent persona design and task delegation"
    ],
    tech: ["CrewAI", "LangGraph"],
    link: "#"
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section className="section" id="projects">
      <h2 className="section-title">Featured <span>Projects</span></h2>
      <div className={styles.grid}>
        {projects.map(project => (
          <div key={project.id} className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
              <div className={styles.techStack}>
                {project.tech.map(tech => (
                  <span key={tech} className={styles.tech}>{tech}</span>
                ))}
              </div>
              <button 
                onClick={() => setSelectedProject(project)} 
                className={styles.link}
              >
                View Project &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProject(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedProject(null)}>&times;</button>
            <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
            
            <div className={styles.techStackModal}>
                {selectedProject.tech.map(tech => (
                  <span key={tech} className={styles.tech}>{tech}</span>
                ))}
            </div>

            <p className={styles.modalDesc}>{selectedProject.longDescription}</p>
            
            <div className={styles.topicsContainer}>
              <h4>Main Topics & Highlights</h4>
              <ul className={styles.topicsList}>
                {selectedProject.mainTopics.map((topic, idx) => (
                  <li key={idx} className={styles.topicItem}>{topic}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
