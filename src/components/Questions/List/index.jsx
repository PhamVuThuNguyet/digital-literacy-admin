import React from 'react';
import styles from './style.module.scss';

const alphabetChoices = ['A', 'B', 'C', 'D', 'E', 'F'];

function ListQuestions({ questions, toggleQuestion, deleteQuestion }) {
  return (
    <>
      {questions.map((question, index) => (
        <div key={question._id}>
          <div className={styles.title}>
            {' '}
            Question {index + 1} ({question.isShow ? 'Showing' : 'Hiding'}): {question.question}{' '}
          </div>
          <div className={styles.choices}>
            {question.choices.map((choice, index) => (
              <div
                className={`${styles.choice} ${
                  question.answers.includes(choice)
                    ? styles['correct-choice']
                    : ''
                }`}
                key={index}
              >
                {alphabetChoices[index]}. {choice}
              </div>
            ))}
          </div>
          <div className={styles.answer}>
            Answer: {question.answers.join(',')}
          </div>
          <div className={styles['button-wrap']}>
            <button onClick={() => toggleQuestion(question._id)}>
              {question.isShow ? 'Hidden' : 'Show'} question
            </button>
            <button onClick={() => deleteQuestion(question._id)}>
              Delete question
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ListQuestions;
