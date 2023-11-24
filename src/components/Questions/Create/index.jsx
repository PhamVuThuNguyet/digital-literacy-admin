import React, { useState } from 'react';
import styles from './style.module.scss';
import QuestionsPreview from './Preview';

const alphabetChoices = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function CreateQuestions() {
  const [numberQuestions, setNumberQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionsPreview, setQuestionPreview] = useState([]);

  const handleGenerateQuestion = (e) => {
    e.preventDefault();
    if (numberQuestions > questions.length) {
      const newQuestions = new Array(
        Number(numberQuestions - questions.length)
      ).fill({
        questions: '',
        choices: ['', '', '', ''],
        answers: [],
      });
      setQuestions([...questions, ...newQuestions]);
    } else {
      const newListRows = questions.slice(0, numberRows);
      setQuestions(newListRows);
    }
  };

  const handleChange = (e, i, choiceIndex) => {
    const newQuestions = JSON.parse(JSON.stringify(questions));
    if (e.target.name === 'question') {
      newQuestions[i].question = e.target.value;
    } else if (e.target.name === 'choices') {
      newQuestions[i].choices[choiceIndex] = e.target.value;
    } else if (e.target.name === 'answers') {
      newQuestions[i].answers = e.target.value.split(',');
    }

    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    const validQuestions = questions.filter((question) => {
      const isQuestionTitle = question.question !== '';
      const isValidChoices =
        question.choices.filter((item) => item === '').length !==
        question.choices.length;
      const isValidAnswers = question.answers.find((answer) =>
        question.choices.includes(answer)
      );
      return isQuestionTitle && isValidChoices && isValidAnswers;
    });
    setQuestionPreview(validQuestions);
  };

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className={`${styles.container} content-section`}>
          {questionsPreview.length > 0 && (
            <QuestionsPreview
              questionsPreview={questionsPreview}
              onClose={() => setQuestionPreview([])}
            />
          )}
          <form
            className={styles['number-questions']}
            onSubmit={handleGenerateQuestion}
          >
            <span>Number questions: </span>
            <input
              type="number"
              value={numberQuestions}
              onChange={(e) => setNumberQuestions(e.target.value)}
            />
            <button type="submit">Generate</button>
          </form>
          <div className={styles['list-questions']}>
            {questions.map((item, index) => (
              <div className={styles['question-item']} key={index}>
                <div className={styles['question-title']}>
                  <span>Question {index + 1}: </span>
                  <input
                    name="question"
                    value={item.question}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className={styles.choices}>
                  {item.choices.map((choice, i) => (
                    <div className={styles.choice} key={i}>
                      <span>{alphabetChoices[i]}.</span>
                      <input
                        value={choice}
                        name="choices"
                        onChange={(e) => handleChange(e, index, i)}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.answers}>
                  <span>Answers:</span>
                  <input
                    value={item.answers.join(',')}
                    name="answers"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles['submit-button-wrap']}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
