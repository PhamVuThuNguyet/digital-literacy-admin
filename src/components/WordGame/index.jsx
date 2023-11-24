import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import WordGamePreview from './Preview';
import { updateWordGame, getWordGame } from '@src/api/word-game.js';
import toast from '@src/utils/toast';

export default function WordGame() {
  const [numberRows, setNumberRows] = useState(0);
  const [id, setId] = useState();
  const [listRows, setListRows] = useState([]);
  const [keyword, setKeyword] = useState('');

  const handleGenerateRows = (e) => {
    e.preventDefault();
    if (numberRows > listRows.length) {
      const newListRows = new Array(Number(numberRows - listRows.length)).fill({
        question: '',
        word: '',
        letter: 0,
      });
      setListRows([...listRows, ...newListRows]);
    } else {
      const newListRows = listRows.slice(0, numberRows);
      setListRows(newListRows);
    }
  };

  const handleChange = (e, i) => {
    const newListRows = JSON.parse(JSON.stringify(listRows));
    newListRows[i][e.target.name] = e.target.value;

    setListRows(newListRows);
  };

  const handleSubmit = async () => {
    try {
      await updateWordGame(id, {
        special: keyword,
        words: listRows,
      });
      toast.success('Update word game successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWordGame = async () => {
    try {
      const { data } = await getWordGame();
      setId(data[0]._id);
      setKeyword(data[0].special);
      setListRows(data[0].words);
      setNumberRows(data[0].words.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWordGame();
  }, []);

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className={`${styles.container} content-section`}>
          <div className={styles.left}>
            <form
              className={styles['number-questions']}
              onSubmit={handleGenerateRows}
            >
              <div>
                <span>Number rows: </span>
                <input
                  type="number"
                  value={numberRows}
                  onChange={(e) => setNumberRows(e.target.value)}
                />
              </div>
              <div>
                <span>Keyword: </span>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <button type="submit">Generate</button>
            </form>
            <div className={styles['list-questions']}>
              {listRows.map((item, index) => (
                <div className={styles['question-item']} key={index}>
                  <div className={styles['question-title']}>
                    <span>Question {index + 1}: </span>
                    <input
                      name="question"
                      value={item.question}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className={styles['question-title']}>
                    <span>Word: </span>
                    <input
                      name="word"
                      value={item.word}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className={styles['question-title']}>
                    <span>Special position: </span>
                    <input
                      name="letter"
                      value={item.letter}
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
          <div className={styles.right}>
            <WordGamePreview data={listRows} />
          </div>
        </div>
      </div>
    </div>
  );
}
