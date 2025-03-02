// Este script debe ejecutarse con Node.js
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const firebaseConfig = require('./firebase-config');

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdmin() {
  try {
    // Cambia estos valores si lo deseas
    const email = 'donovanvincelara@gmail.com';
    const password = '123asdZXC@'; // Usa una contraseña segura
    
    // Crear usuario
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Guardar rol de administrador en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: 'admin',
      createdAt: new Date()
    });
    
    console.log(`Usuario administrador creado con éxito: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error al crear usuario administrador:', error);
    process.exit(1);
  }
}

createAdmin(); 