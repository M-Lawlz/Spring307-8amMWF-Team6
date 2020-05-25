import App from "firebase/app";

const config = {
  apiKey: "AIzaSyBovMCB9m-MAZBa316hhvM0HMr4zOQKYYY",
  authDomain: "simtrek-e8a05.firebaseapp.com",
  databaseURL: "https://simtrek-e8a05.firebaseio.com",
  projectId: "simtrek-e8a05",
  storageBucket: "simtrek-e8a05.appspot.com",
  messagingSenderId: "366840634157",
  appId: "1:366840634157:web:f64f92efb2c52243bdd1a4",
  measurementId: "G-89NSG969R7",
};

export default class Firebase {
  constructor() {
    App.initializeApp(config);
  }
}
