import firebase from 'firebase' ;
var firebaseConfig = {
    apiKey: "AIzaSyCgqu_JvqfXUhrct7yLQDpnxxJv5VnBeYU",
    authDomain: "ringed-subject-273722.firebaseapp.com",
    databaseURL: "https://ringed-subject-273722.firebaseio.com",
    projectId: "ringed-subject-273722",
    storageBucket: "ringed-subject-273722.appspot.com",
    messagingSenderId: "618606982099",
    appId: "1:618606982099:web:d7cb082213acac9f753526",
    measurementId: "G-22FWH8X4V3"
  };
  const fire=firebase.initializeApp(firebaseConfig);
  export default fire;