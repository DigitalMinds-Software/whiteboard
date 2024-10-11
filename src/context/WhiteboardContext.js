import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { subscribeToCollection, createDocument, updateDocument } from '../firebase/firestore';
import { uploadFile } from '../firebase/storage';

export const WhiteboardContext = createContext();

export const WhiteboardProvider = ({ children }) => {
  const [whiteboards, setWhiteboards] = useState([]);
  const [currentWhiteboard, setCurrentWhiteboard] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToCollection('whiteboards', (snapshot) => {
        const updatedWhiteboards = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((wb) => wb.users.includes(user.uid));
        setWhiteboards(updatedWhiteboards);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const createWhiteboard = async (name) => {
    const newWhiteboard = {
      name,
      createdBy: user.uid,
      users: [user.uid],
      createdAt: new Date().toISOString(),
      elements: [],
    };
    const docRef = await createDocument('whiteboards', newWhiteboard);
    return docRef.id;
  };

  const addElement = async (whiteboardId, element) => {
    const updatedElements = [...currentWhiteboard.elements, element];
    await updateDocument('whiteboards', whiteboardId, { elements: updatedElements });
  };

  const updateElement = async (whiteboardId, elementId, data) => {
    const updatedElements = currentWhiteboard.elements.map((el) =>
      el.id === elementId ? { ...el, ...data } : el
    );
    await updateDocument('whiteboards', whiteboardId, { elements: updatedElements });
  };

  const deleteElement = async (whiteboardId, elementId) => {
    const updatedElements = currentWhiteboard.elements.filter((el) => el.id !== elementId);
    await updateDocument('whiteboards', whiteboardId, { elements: updatedElements });
  };

  const saveWhiteboardImage = async (whiteboardId, imageBlob) => {
    const imagePath = `whiteboards/${whiteboardId}/preview.png`;
    const imageUrl = await uploadFile(imageBlob, imagePath);
    await updateDocument('whiteboards', whiteboardId, { previewUrl: imageUrl });
  };

  return (
    <WhiteboardContext.Provider
      value={{
        whiteboards,
        currentWhiteboard,
        setCurrentWhiteboard,
        createWhiteboard,
        addElement,
        updateElement,
        deleteElement,
        saveWhiteboardImage,
      }}
    >
      {children}
    </WhiteboardContext.Provider>
  );
};