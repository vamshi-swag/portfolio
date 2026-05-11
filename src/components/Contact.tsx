'use client';

import { useState, useRef } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(formRef.current!);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('sent');
        formRef.current?.reset();
        
        // Reset status back to idle after 3 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="section" id="contact">
      <h2 className="section-title">Get In <span>Touch</span></h2>
      <div className="content-frame">
        <div className={styles.container}>
          <div className={styles.info}>
            <h3 className={styles.infoTitle}>Let's talk about AI.</h3>
            <p className={styles.infoDesc}>
              Whether you have a question about my work, want to collaborate on a project, 
              or just want to say hi, my inbox is always open. I'll try my best to get back to you!
            </p>
            <div className={styles.contactDetails}>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Email</span>
                <a href="mailto:nvamshi630@gmail.com" className={styles.detailValue}>nvamshi630@gmail.com</a>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Phone</span>
                <span className={styles.detailValue}>+91 7013220621</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>Hyderabad, India</span>
              </div>
            </div>
          </div>
          <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <input type="text" id="name" name="name" className={styles.input} placeholder="John Doe" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input type="email" id="email" name="email" className={styles.input} placeholder="john@example.com" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea id="message" name="message" className={styles.textarea} placeholder="Hello..." rows={5} required></textarea>
            </div>
            <button 
              type="submit" 
              className={`${styles.submitBtn} ${status === 'sent' ? styles.success : ''}`}
              disabled={status === 'sending'}
            >
              {status === 'idle' && 'Send Message'}
              {status === 'sending' && 'Sending...'}
              {status === 'sent' && 'Message Sent!'}
              {status === 'error' && 'Try Again'}
            </button>
            {status === 'error' && <p className={styles.errorMessage}>Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
