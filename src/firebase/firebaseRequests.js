import { getApps, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  documentId,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
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

// Quartic Lab projects
const collectionProjects = "projects"; // collection name in Firestore

export const getAllProjects = () => getAllItems(collectionProjects);
export const addProject = data => addItem(collectionProjects, data);

// fetch specific projects by their Firestore document IDs (max 30 per call)
export const getProjectsByIds = async ids => {
  if (!ids || !ids.length) {
    return [];
  }
  const results = [];
  // Firestore 'in' supports up to 30 items per query
  for (let i = 0; i < ids.length; i += 30) {
    const chunk = ids.slice(i, i + 30);
    const q = query(
      collection(db, collectionProjects),
      where(documentId(), "in", chunk),
    );
    const snap = await getDocs(q);
    snap.forEach(doc => results.push({ id: doc.id, ...doc.data() }));
  }
  return results;
};

// Quartic Lab services
const collectionServices = "services"; // collection name in Firestore

export const getAllServices = () => getAllItems(collectionServices);
export const addService = data => addItem(collectionServices, data);

// Quartic Lab reviews
const collectionReviews = "reviews"; // collection name in Firestore

export const getAllReviews = () => getAllItems(collectionReviews);
export const addReview = data => addItem(collectionReviews, data);

// contact form submissions
const collectionContactSubmissions = "contact_submissions";

export const submitContactForm = data =>
  addItem(collectionContactSubmissions, data);

// Quartic Lab service details (full detail-page content per slug)
const collectionServiceDetails = "service_details";

export const getAllServiceDetails = () => getAllItems(collectionServiceDetails);

export const getServiceBySlug = async slug => {
  const q = query(
    collection(db, collectionServiceDetails),
    where("slug", "==", slug),
  );
  const snap = await getDocs(q);
  if (snap.empty) {
    return null;
  }
  return snap.docs[0].data();
};

export const addServiceDetail = data => addItem(collectionServiceDetails, data);
