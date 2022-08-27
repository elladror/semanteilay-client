import { FC, FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useInput } from "../../hooks/useInput";
import { useLocalStorage } from "usehooks-ts";
import Title from "../title";
import useUser from "../../hooks/useUser";
import { AxiosError } from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Login: FC = () => {
  const [lastNickname, setLastNickname] = useLocalStorage("last-nickname", "");
  const { value: name, setValue: setName, bind: bindInput } = useInput("");
  const [warning, setWarning] = useState("");
  const [error, setError] = useState<AxiosError | null>(null);
  const router = useRouter();
  const { signUp } = useUser();

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    setName(lastNickname);
  }, [lastNickname, setName]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (name.length > 10) {
      setWarning("Name longer than 10 characters");

      return;
    }

    try {
      await signUp({ name });
      setLastNickname(name);
      router.push("/");
    } catch (error) {
      if ((error as AxiosError).response?.status === 409) {
        setWarning("Name Taken");
      } else {
        setError(error as AxiosError);
      }
    }
  };

  return (
    <main>
      <Title>This shit</Title>
      <form onSubmit={handleSubmit}>
        <TextField {...bindInput} label="nickname" sx={{ margin: 1 }} />
        <Button type="submit" sx={{ width: "15ch" }}>
          <b>Play</b>
        </Button>
      </form>
      {warning && (
        <Alert severity="warning">
          <AlertTitle>Try a different name</AlertTitle>
          {warning}
        </Alert>
      )}
      {error && (
        <Alert severity="error">
          <AlertTitle>Error occured</AlertTitle>
          {error.message}
        </Alert>
      )}
    </main>
  );
};

export default Login;
