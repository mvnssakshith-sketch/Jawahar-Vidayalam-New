import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCPdJECClS-ZSo397of272D1wC_11m9h24',
  authDomain: 'jawahar-vidayalam.firebaseapp.com',
  projectId: 'jawahar-vidayalam',
  storageBucket: 'jawahar-vidayalam.firebasestorage.app',
  messagingSenderId: '1044801376851',
  appId: '1:1044801376851:web:88f708e3b68b7ff512aca6',
  measurementId: 'G-SHGDWX5LB1',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = initializeFirestore(app, { ignoreUndefinedProperties: true })

isSupported()
  .then((ok) => ok && getAnalytics(app))
  .catch(() => {})
