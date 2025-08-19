import React, { useState } from 'react';
import styles from './QuizComponent.module.css';

export default function QuizComponent({ question, answers, children }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsRevealed(true);
  };

  // Determines the className for a button based on the current state.
  const getButtonClassName = (answer) => {
    const classNames = [styles.button];
    if (isRevealed) {
      if (answer.isCorrect) {
        classNames.push(styles.correctButton);
      } else if (selectedAnswer === answer) {
        classNames.push(styles.incorrectButton);
      } else {
        classNames.push(styles.disabledButton);
      }
    }
    return classNames.join(' ');
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Test Your Knowledge</h3>
      <p className={styles.question}>{question}</p>

      <div className={styles.buttonContainer}>
        {/* Map over the answers array to create a button for each one. */}
        {answers &&
          answers.map((answer, index) => (
            <button
              key={index}
              className={getButtonClassName(answer)}
              onClick={() => handleAnswerClick(answer)}
              disabled={isRevealed}
            >
              {answer.text}
            </button>
          ))}
      </div>

      {isRevealed && (
        <div className={styles.explanation}>
          <p className={styles.explanationHeader}>Explanation</p>
          <p>{children}</p>
        </div>
      )}
    </div>
  );
}
