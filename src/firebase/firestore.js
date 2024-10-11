import { db } from './config';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';

export const createDocument = (collectionName, id, data) =>
  setDoc(doc(db, collectionName, id), data);

export const updateDocument = (collectionName, id, data) =>
  updateDoc(doc(db, collectionName, id), data);

export const deleteDocument = (collectionName, id) =>
  deleteDoc(doc(db, collectionName, id));

export const getDocument = (collectionName, id) =>
  getDoc(doc(db, collectionName, id));

export const subscribeToCollection = (collectionName, callback) =>
  onSnapshot(collection(db, collectionName), callback);