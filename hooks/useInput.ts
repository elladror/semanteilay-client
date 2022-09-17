import { ChangeEvent, useState } from "react";

export const useInput = (initialValue: string, maxLength = 20, minLength = 1) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const regex = /^[a-zA-Z0-9\u0590-\u05fe'() ]+$/;

  return {
    value,
    setValue,
    reset: () => setValue(""),
    error,
    bind: {
      value,
      error,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        setError(!regex.test(value) || value.length < minLength || value.length > maxLength);
        setValue(value);
      },
    },
  };
};
