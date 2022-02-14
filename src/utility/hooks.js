import { useState } from "react";

export function useToggle(def) {
  const [bool, setBool] = useState(def);
  return [
    bool,
    () => {
      setBool(!bool);
    },
  ];
}
