import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAoBLL-O9WvjHHqF6v_fECVGTMZxc_j6jo",
    authDomain: "willy-860d0.firebaseapp.com",
    projectId: "willy-860d0",
    storageBucket: "willy-860d0.appspot.com",
    messagingSenderId: "102980908443",
    appId: "1:102980908443:web:5da971696670f03a5a5d3e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();