import { initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export const login = async ({ lang }: { lang?: string }) => {
  // Frontend configuration
  const firebaseConfig = {
    // This is a fake API key so dont get all excited
    apiKey: 'AIzaSyDfgewyyKdVo0e1v4XASPQ1pz4P8AAFPIk',
    authDomain: 'fake-auth-domain',
    projectId: 'qwik-test-5be00',
    storageBucket: '',
    appId: '',
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  connectAuthEmulator(auth, 'http://localhost:9099');

  auth.languageCode = lang ?? 'en';

  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();

  await fetch('/auth', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ token }),
  });

  return token;
};
