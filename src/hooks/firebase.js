import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

export function useUser() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(!auth.currentUser && !user);

  useEffect(() => {
    function authStateChanged(newUser) {
      if (newUser) {
        if (!user || newUser.uid !== user.uid) setUser(newUser);
      } else {
        if (user) setUser(newUser);
      }
      setLoading(false);
    }

    return onAuthStateChanged(auth, authStateChanged);
  }, [user]);

  return [user, loading];
}
