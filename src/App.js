import React from 'react';
import NoteEditor from './components/NoteEditor/NoteEditor';
import NoteCard from './components/NoteCard/NoteCard';
import { useFirebase } from './components/Firebase/context';

function App() {
  const [notes, setNotes] = React.useState([]);
  const firebase = useFirebase();

  React.useEffect(() => {
    // TODO: when fetching the notes you should also consider sorting by createdDate desc
    // TODO: and maybe user ordering. This can be accomplished by adding a priority tag to the notes
    // TODO: then we can have `orderBy('priory', 'desc')` as well
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
      <div className="">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </>
  );
}

export default App;
