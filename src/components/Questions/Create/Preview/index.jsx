import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import styles from '../style.module.scss';
import { createQuestions } from '@src/api/questions';
import toast from '@src/utils/toast';
import { useNavigate } from 'react-router-dom';

const alphabetChoices = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function QuestionsPreview({ questionsPreview, onClose }) {
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await createQuestions(questionsPreview);
      toast.success('Add questions successfully');
      setTimeout(() => {
        navigate('/questions');
      }, 1000);
    } catch (error) {
      alert(error);
    }
  };

  useOnClickOutside(ref, () => onClose());

  return (
    <div className={styles['preview-questions-container']}>
      <div className={styles['preview-questions']} ref={ref}>
        <div className={styles['preview-question-heading']}>
          Preview Questions
        </div>
        {questionsPreview.map((question, index) => (
          <div key={index} className={styles['preview-question']}>
            <div className={styles['preview-question-title']}>
              <b>Question {index + 1}: </b>
              {question.question}
            </div>
            <div className={styles['preview-question-choices']}>
              {question.choices.map((choice, i) => (
                <div
                  className={`${styles['preview-question-choice']} ${
                    question.answers.includes(choice)
                      ? styles['correct-preview-question-choice']
                      : ''
                  }`}
                >
                  <b>{alphabetChoices[i]}. </b>
                  {choice}
                </div>
              ))}
            </div>
            <div className={styles['preview-question-answer']}>
              <b>Answers: </b> {question.answers.join(', ')}
            </div>
          </div>
        ))}

        <button
          className={styles['preview-question-submit']}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
