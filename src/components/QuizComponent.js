import React, { useState } from 'react';

export default function QuizComponent({ question, answers, children }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsRevealed(true);
  };

  const styles = {
    container: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '24px',
      margin: '24px 0',
      backgroundColor: '#f9fafb',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    },
    header: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '20px',
      textAlign: 'left',
    },
    question: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#111827',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    button: {
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      color: '#374151',
      cursor: 'pointer',
      textAlign: 'left',
      fontSize: '1rem',
      transition: 'all 0.2s ease-in-out',
      width: '100%',
    },
    // Style for the correct answer button after reveal
    correctButton: {
      backgroundColor: '#f0fdfa',
      borderColor: '#a7f3d0',
      color: '#047857',
      fontWeight: 'bold',
    },
    // Style for an incorrect answer button that the user selected
    incorrectButton: {
      backgroundColor: '#fff1f2',
      borderColor: '#fecdd3',
      color: '#be123c',
    },
    // Style for other buttons after an answer is revealed
    disabledButton: {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
    explanation: {
      marginTop: '20px',
      padding: '16px',
      border: '1px solid #a5f3fc',
      borderRadius: '6px',
      backgroundColor: '#ecfeff',
      color: '#0e7490',
    },
    explanationHeader: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '20px',
      textAlign: 'left',
    },
  };

  // Determines the style for a button based on the current state.
  const getButtonStyle = (answer) => {
    if (!isRevealed) {
      return styles.button;
    }
    // If revealed, style the correct answer green.
    if (answer.isCorrect) {
      return { ...styles.button, ...styles.correctButton };
    }
    // If the user selected this specific incorrect answer, style it red.
    if (selectedAnswer === answer) {
      return { ...styles.button, ...styles.incorrectButton };
    }
    // Otherwise, just disable the button.
    return { ...styles.button, ...styles.disabledButton };
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Test Your Knowledge</h3>
      <p style={styles.question}>{question}</p>

      <div style={styles.buttonContainer}>
        {/* Map over the answers array to create a button for each one. */}
        {answers &&
          answers.map((answer, index) => (
            <button
              key={index}
              style={getButtonStyle(answer)}
              onClick={() => handleAnswerClick(answer)}
              disabled={isRevealed}
            >
              {answer.text}
            </button>
          ))}
      </div>

      {isRevealed && (
        <div style={styles.explanation}>
          <p style={styles.explanationHeader}>Explanation</p>
          <p>{children}</p>
        </div>
      )}
    </div>
  );
}
