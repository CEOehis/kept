import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Firebase from './firebase';

const FirebaseContext = React.createContext();

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {children}
    </FirebaseContext.Provider>
  );
};

function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within a FirebaseProvider');
  }

  return context;
}

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FirebaseProvider, useFirebase };

export default FirebaseContext;
