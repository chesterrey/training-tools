import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"

import firebase_app from "../config"

// Get the Firestore instance
const db = getFirestore(firebase_app)

// Function to retrieve a document from a Firestore collection
export default async function getRoutines() {
  // Create a document reference using the provided collection and ID
  const routineRef = collection(db, "routines")

  // Variable to store the result of the operation
  let result = null
  // Variable to store any error that occurs during the operation
  let error = null

  try {
    // Retrieve the document using the document reference
    result = await getDocs(routineRef)

    // Convert the result to an array of objects
    result = result.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }
    })
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e
  }

  // Return the result and error as an object
  return { result, error }
}
