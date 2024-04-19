import { useCallback, useState } from "react";

function useFormValidity(initialState: Record<string, boolean>) {
  const [formFieldsValid, setFormFieldsValid] =
    useState<Record<string, boolean>>(initialState);

  const setFieldByValidity = useCallback((field: string, isValid: boolean) => {
    setFormFieldsValid((prev) => ({ ...prev, [field]: isValid }));
  }, []);

  const formValidList = Object.values(formFieldsValid);
  const formValid = formValidList.every((valid) => valid);
  return [formValid, setFieldByValidity] as [
    boolean,
    (field: string, isValid: boolean) => void,
  ];
}

export default useFormValidity;
