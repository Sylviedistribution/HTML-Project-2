// hooks/useCurrentUser.ts
import { useEffect, useState } from 'react';

export function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
      // Récupérer l'utilisateur dans localStorage (ou autre stockage)
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user) {
        setCurrentUser(user);
      }
    }, []); // L'effet ne se déclenche qu'au montage initial
  
    return currentUser;
  }