import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";

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

function deepCompareEquals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function useDeepCompareMemoize(value) {
  const ref = useRef();
  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

function useDeepCompareEffect(callback, dependencies, deepDependencies) {
  useEffect(
    callback,
    dependencies.concat(deepDependencies.map(useDeepCompareMemoize))
  );
}

export function useCollection(
  insertDocCallback,
  collectionName,
  ...queryOptions
) {
  const [docs, setDocs] = useState([]);

  useDeepCompareEffect(
    () => {
      const recentMessagesQuery = query(
        collection(db, collectionName),
        ...queryOptions
      );

      return onSnapshot(recentMessagesQuery, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            const data = change.doc.data();
            data.docId = change.doc.id;
            setDocs((prevDocs) => insertDocCallback(prevDocs.slice(), data));
            // setDocs((prevDocs) => prevDocs.concat(data));
          }
        });
      });
    },
    [collectionName],
    [queryOptions]
  );

  return docs;
}

export function useDocument(...docPath) {
  const [document, setDocument] = useState({});

  const path = docPath.join("/");

  useEffect(() => {
    const recentMessagesQuery = query(doc(db, path));

    return onSnapshot(recentMessagesQuery, function (snapshot) {
      setDocument(snapshot.data());
    });
  }, [path]);

  return document;
}
