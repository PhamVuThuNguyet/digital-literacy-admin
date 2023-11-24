import React, { useEffect } from 'react';
import styles from '../style.module.scss';

// const data = {
//   special: 'nambo',
// words: [
//   {
//     word: 'dientich',
//     question: 'Cau hoi 1',
//     letter: 3,
//   },
//   {
//     word: 'phusa',
//     question: 'Cau hoi 2',
//     letter: 4,
//   },
//   {
//     word: 'camau',
//     question: 'Cau hoi 3',
//     letter: 2,
//   },
//   {
//     word: 'bacbo',
//     question: 'Cau hoi 4',
//     letter: 0,
//   },
//   {
//     word: 'mecong',
//     question: 'Cau hoi 5',
//     letter: 3,
//   },
// ],
// };

export default function WordGamePreview({ data }) {
  let longestLeft = 0;
  let longestRight = 0;
  let specialWord = '';
  data.map((item) => {
    longestLeft = Math.max(longestLeft, Number(item.letter));
    longestRight = Math.max(longestRight, item.word.length - item.letter - 1);
    specialWord += item.word[item.letter];
  });

  return (
    <div className={styles['preview-container']}>
      {data.map((word, index) => (
        <div key={index} className={styles['box-container']}>
          {new Array(longestLeft - Number(word.letter)).fill(0).map((_, i) => (
            <div
              key={i}
              className={`${styles.box} ${styles['unused-box']}`}
            ></div>
          ))}
          {word.word.split('').map((item, i) => (
            <div
              key={i}
              className={`${styles.box} ${
                i == word.letter ? styles.active : ''
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
