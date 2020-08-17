import React from 'react';
import PropTypes from 'prop-types';
import NoteEditor from './components/NoteEditor/NoteEditor';
import { withFirebase } from './components/Firebase';

function App({ firebase }) {
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = firebase.db
      .collection('notes')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const data = [];

        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setNotes(data);
      });

    // unsubscribe from firebase document changes
    return () => unsubscribe();
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
