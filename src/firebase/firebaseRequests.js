import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// helper function to get all items of a collection
const getAllItems = async (collectionName) => {
  const items = [];
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  querySnapshot.forEach((doc) => items.push(doc.data()));
  return items;
};

// helper function to add an item to a collection
const addItem = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    return await addDoc(collectionRef, data);
  } catch (error) {}
};

// zweidevs projects
const collectionProjects = process.env.NEXT_PUBLIC_collectionProjects;

export const getAllProjects = () => getAllItems(collectionProjects);
export const addProject = (data) => addItem(collectionProjects, data);

// zweidevs services
const collectionServices = process.env.NEXT_PUBLIC_collectionServices;

export const getAllServices = () => getAllItems(collectionServices);
export const addService = (data) => addItem(collectionServices, data);

// zweidevs reviews
const collectionReviews = process.env.NEXT_PUBLIC_collectionReviews;

export const getAllReviews = () => getAllItems(collectionReviews);
export const addReview = (data) => addItem(collectionReviews, data);
