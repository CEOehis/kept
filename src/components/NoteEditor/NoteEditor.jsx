import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';

function NoteEditor({ firebase }) {
  const [value, setValue] = useState('');
  const [isOpen, setOpen] = useState(false);
  const quill = useRef(null);

  useEffect(() => {
    quill.current.focus();
    setOpen(value && true);
  }, [value]);

  function submitForm() {
    firebase.createNote(value);
    setValue('');
  }

  // todo: figure out how to listen for new documents created
  // todo: and then fetch the latest document from firebase

  return (
    <div className="editor">
      <ReactQuill
        placeholder="Take a note"
        ref={quill}
        theme="bubble"
        value={value}
        onChange={setValue}
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
