import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import app from 'firebase/app';

function NoteEditor({ firebase }) {
  const [value, setValue] = useState('');
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setOpen(value && true);
  }, [value]);

  function submitForm() {
    if (!value.trim().length) return;
    firebase.db
      .collection('notes')
      .add({
        text: value,
        createdAt: app.firestore.FieldValue.serverTimestamp(),
      })
      .then((/* docRef */) => {})
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    setValue('');
  }

  function handleInputChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="editor flex flex-col p-5 px-2 w-1/4 min-w-0 shadow rounded mx-auto m-8">
      <textarea
        value={value}
        aria-label="Take a note..."
        onBlur={submitForm}
        onChange={handleInputChange}
      />
      {isOpen && (
        <button
          type="button"
          onClick={submitForm}
          className="close px-6 py-1 self-end rounded hover:bg-gray-100 focus:bg-gray-300 focus:outline-none"
        >
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
