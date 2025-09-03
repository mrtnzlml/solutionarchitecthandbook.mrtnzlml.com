import React from 'react';
import styles from './SolutionArchitectCTA.module.css';

const userData = {
  name: 'Martin Zlámal',
  title: 'Solution Architect',
  imageUrl: 'https://github.com/mrtnzlml.png',
  description:
    "My role as your Solution Architect is centered on one thing: your success. For some, it's about unlocking new ARR. For others, it's about getting rid of the old pesky system that is holding you back. Either way, I'm here to help. I thrive on diving into complex challenges and translating your vision into a robust, scalable reality. Partner with me to design a strategic blueprint that not only solves your immediate problems but also unlocks new opportunities and maximizes the value of your technology investment.",
  linkedinUrl: 'https://www.linkedin.com/in/mrtnzlml',
};

/**
 * ## Usage
 *
 * Import it at the top of your MDX file:
 *
 * import SolutionArchitectCTA from '@site/src/components/SolutionArchitectCTA';
 *
 * Then, you can use it in your content like this:
 *
 * <SolutionArchitectCTA />
 */
export default function SolutionArchitectCTA() {
  return (
    <div className={styles.ctaContainer}>
      <div className={styles.imageContainer}>
        {/* Profile Picture */}
        <img
          src={userData.imageUrl}
          alt={`Profile picture of ${userData.name}`}
          className={styles.profileImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x400/cccccc/ffffff?text=Profile';
          }}
        />

        {/* Call to Action Button */}
        <div className={styles.buttonContainer}>
          <a
            href={userData.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            <svg
              className={styles.linkedinIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 53.79-54.3c29.7 0 53.79 24.2 53.79 54.3.01 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
            </svg>
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Need a Solution Architect?</h2>
        <p className={styles.description}>{userData.description}</p>
      </div>
    </div>
  );
}
