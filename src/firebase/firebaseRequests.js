import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// zweidevs projects
const collectionProjects = collection(
  db,
  process.env.NEXT_PUBLIC_collectionProjects
);

export const getAllProjects = async () => {
  const projects = [];
  const getProjects = await getDocs(collectionProjects);
  getProjects.forEach(project => projects.push(project.data()));
  return projects;
};

export const addProject = async data => {
  try {
    return await addDoc(collectionProjects, data);
  } catch (error) {
    console.log("error addProject ==> ", error);
  }
};

// zweidevs services
const collectionServices = collection(
  db,
  process.env.NEXT_PUBLIC_collectionServices
);

export const getAllServices = async () => {
  const services = [];
  const getServices = await getDocs(collectionServices);
  getServices.forEach(service => services.push(service.data()));
  return services;
};

export const addService = async data => {
  try {
    return await addDoc(collectionServices, data);
  } catch (error) {
    console.log("error addService ==> ", error);
  }
};
