import { createContext, useContext } from "react";

/**
 * Provides the raw Firestore services list to the entire app tree.
 * Shape: [{ title, slug, order }]
 */
export const ServicesContext = createContext([]);
export const useNavServices = () => useContext(ServicesContext);
