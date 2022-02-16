import { useEffect, useState } from "react";

export function useToggle(def) {
  const [bool, setBool] = useState(def);
  return [
    bool,
    () => {
      setBool(!bool);
    },
  ];
}

export function useRerender() {
  const [bool, setBool] = useState(false);
  return () => {
    setBool(!bool);
  };
}
