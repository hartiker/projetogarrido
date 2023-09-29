// Importe as funções necessárias dos SDKs necessários
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Adicione SDKs para produtos do Firebase que você quer usar
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuração do Firebase do seu aplicativo da web
const firebaseConfig = {
  apiKey: "AIzaSyBoxBQ1u1wYxlLgtVF34p2BlFJyoBdzV8Y",
  authDomain: "money-wise-cadca.firebaseapp.com",
  projectId: "money-wise-cadca",
  storageBucket: "money-wise-cadca.appspot.com",
  messagingSenderId: "951092102841",
  appId: "1:951092102841:web:4e173099a2a773a3f1fd68"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { app, db, auth }