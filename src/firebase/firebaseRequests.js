import { getApps, initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase — reuse existing app to avoid duplicate-app error in SSR/ISR
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

// helper function to get all items of a collection
const getAllItems = async collectionName => {
  const items = [];
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  querySnapshot.forEach(doc => items.push(doc.data()));
  return items;
};

// helper function to add an item to a collection
const addItem = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    return await addDoc(collectionRef, data);
  } catch (error) {
    return error;
  }
};

// zweidevs projects
const collectionProjects = "projects"; // collection name in Firestore

export const getAllProjects = () => getAllItems(collectionProjects);
export const addProject = data => addItem(collectionProjects, data);

// zweidevs services
const collectionServices = "services"; // collection name in Firestore

export const getAllServices = () => getAllItems(collectionServices);
export const addService = data => addItem(collectionServices, data);

// zweidevs reviews
const collectionReviews = "reviews"; // collection name in Firestore

export const getAllReviews = () => getAllItems(collectionReviews);
export const addReview = data => addItem(collectionReviews, data);

// contact form submissions
const collectionContactSubmissions = "contact_submissions";

export const submitContactForm = data =>
  addItem(collectionContactSubmissions, data);
