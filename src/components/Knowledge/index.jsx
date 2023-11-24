import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import toast from '@src/utils/toast';
import { getKnowledge, updateKnowledge } from '@src/api/knowledge';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Knowledge() {
  const [id, setId] = useState();
  const [data, setData] = useState({
    title: '',
    description: '',
  });
  const [listRows, setListRows] = useState([]);

  const handleChange = (e, i) => {
    const newListRows = JSON.parse(JSON.stringify(listRows));
    newListRows[i][e.target.name] = e.target.value;

    setListRows(newListRows);
  };

  const handleSubmit = async () => {
    try {
      const dataSubmit = {
        ...data,
        data: listRows,
      };
      await updateKnowledge(id, dataSubmit);
      toast.success('Update knowledge successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchKnowledge = async () => {
    try {
      const { data } = await getKnowledge();
      setId(data[0]._id);
      setData({
        title: data[0].title,
        description: data[0].description,
      });
      setListRows(data[0].data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  if (!id) return <></>;

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className={`${styles.container} content-section`}>
          <div className={styles.left}>
            <div className={styles['list-questions']}>
              <div className={styles['question-item']}>
                <span>Main Title:</span>
                <input
                  name="question"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />
                <CKEditor
                  editor={ClassicEditor}
                  data={data.description}
                  onChange={(event, editor) => {
                    console.log('dada', data.title);
                    setData({ ...data, description: editor.getData() });
                  }}
                />
              </div>

              <div
                className={`${styles['question-item']} ${styles['question-item-child']}`}
              >
                <span>Child Item:</span>
                {listRows.map((item, index) => (
                  <div
                    key={index}
                    className={styles['question-item-child-item']}
                  >
                    <input
                      name="name"
                      value={item.name}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <CKEditor
                      editor={ClassicEditor}
                      data={item.desc}
                      onChange={(event, editor) => {
                        const desc = editor.getData();
                        const newListRows = JSON.parse(
                          JSON.stringify(listRows)
                        );
                        newListRows[index].desc = desc;
                        setListRows(newListRows);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles['submit-button-wrap']}>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
