/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const TEXT_LENGTH_THRESHOLD = 300;

function getNoteText(inputString) {
  // TODO: Use a threshold that is proportional to the content size
  // TODO: note text is dependent on the actual size of the note
  // TODO: it can be a fraction of it... Say 80% if it's past a certain threshold
  if (inputString.length <= TEXT_LENGTH_THRESHOLD) {
    return inputString;
  }
  return `${inputString.substring(0, TEXT_LENGTH_THRESHOLD)}...`;
}

function NoteCard({ note }) {
  return (
    <div
      style={{
        whiteSpace: 'pre-line',
      }}
      className="card px3 py-5 flex-initial text-gray-700 shadow-lg border-2 px-4 py-2 m-2 rounded rounded-lg"
      dangerouslySetInnerHTML={{ __html: getNoteText(note.text) }}
    />
  );
}

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    createdAt: PropTypes.object.isRequired,
  }).isRequired,
};

export default NoteCard;
