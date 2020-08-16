import React from 'react';
import PropTypes from 'prop-types';
import NoteEditor from './components/NoteEditor/NoteEditor';
import { withFirebase } from './components/Firebase';

function App({ firebase }) {
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    (async function fetchNotesFromStore() {
      const data = await firebase.getNotes();
      setNotes(data);
    })();
  }, [firebase]);
  return (
    <>
      <div className="app">
        <NoteEditor firebase={firebase} />
      </div>
      {notes.map((note) => (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: note.text }} key={note.id} />
      ))}
    </>
  );
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  firebase: PropTypes.object.isRequired,
};

// export default App;
export default withFirebase(App);
