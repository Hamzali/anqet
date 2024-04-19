import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useStateWithInit<T>(
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [value, setValue];
}
