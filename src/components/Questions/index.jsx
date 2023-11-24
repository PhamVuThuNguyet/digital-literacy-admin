import React, { useState, useEffect } from 'react';
import ListQuestions from './List';
import {
  getAllQuestions,
  updateQuestion,
  deleteQuestion as deleteQuestionApi,
} from '@api/questions';
import { convertArrayToObject } from '@utils';

function Questions() {
  const [questions, setQuestions] = useState({});

  const fetchQuestions = async () => {
    try {
      const { data } = await getAllQuestions();
      setQuestions(convertArrayToObject(data));
    } catch (error) {
      alert('Error fetch questions');
    }
  };

  const toggleQuestion = async (id) => {
    try {
      const newIsShow = !questions[id].isShow;
      await updateQuestion(id, { isShow: newIsShow });
      setQuestions({
        ...questions,
        [id]: { ...questions[id], isShow: newIsShow },
      });
    } catch (error) {
      alert('error');
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await deleteQuestionApi(id);
      const newQuestion = JSON.parse(JSON.stringify(questions));
      delete newQuestion[id];
      setQuestions(newQuestion);
    } catch (error) {
      console.log('error', error);
      alert('error');
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className="content-section">
          <div className="content-section-heading">
            <div className="content-section-title">
              {Object.keys(questions).length}{' '}
              {Object.keys(questions).length >= 2 ? 'questions' : 'questions'}
            </div>
          </div>
          <ListQuestions
            questions={Object.values(questions)}
            toggleQuestion={toggleQuestion}
            deleteQuestion={deleteQuestion}
          />
        </div>
      </div>
    </div>
  );
}

export default Questions;
