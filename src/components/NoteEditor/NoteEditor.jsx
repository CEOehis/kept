import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import app from 'firebase/app';

function NoteEditor({ firebase }) {
  const [value, setValue] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [raw, setRaw] = useState('');
  const quill = useRef(null);

  useEffect(() => {
    quill.current.focus();
    setOpen(value && true);
  }, [value]);

  function submitForm() {
    const rx = /^[\n ]+$/; // check for line feed and spaces only
    if (rx.test(raw)) {
      setValue('');
      setOpen(false);
      return;
    }

    firebase.db
      .collection('notes')
      .add({
        text: value,
        createdAt: app.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    setValue('');
  }

  function handleInputChange(content, delta, source, editor) {
    setValue(content);
    setRaw(editor.getText()); // use this to track the raw content of the text box
  }

  return (
    <div className="editor">
      <ReactQuill
        placeholder="Take a note"
        ref={quill}
        theme="bubble"
        value={value}
        onChange={handleInputChange}
        onBlur={submitForm}
      />
      {isOpen && (
        <button type="button" onClick={submitForm} className="close">
          {value.length ? 'Save' : 'Close'}
        </button>
      )}
    </div>
  );
}

NoteEditor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  firebase: PropTypes.object.isRequired,
};

export default NoteEditor;
