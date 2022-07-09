import { Alert, AlertTitle, Button, TextField } from "@mui/material";
import { FC, FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useInput } from "../../hooks/useInput";
import { useLocalStorage } from "usehooks-ts";
import Title from "../title";
import useUser from "../../hooks/useUser"
import { AxiosError } from "axios";

const Login: FC = () => {
  const [lastNickname, setLastNickname] = useLocalStorage("last-nickname", "");
  const { value: name, setValue: setName, bind: bindInput } = useInput("");
  const [warning, setWarning] = useState(false);
  const router = useRouter();
  const { signUp } = useUser();

  useEffect(() => {
    router.prefetch("/lobby");
  }, [router]);

  useEffect(() => {
    setName(lastNickname);
  }, [lastNickname, setName]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      await signUp({name});
      setLastNickname(name);
      router.push("/lobby");
    } catch (error) {
      if((error as AxiosError).response?.status === 409 ) setWarning(true);
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
      {warning && <Alert severity="warning">
        <AlertTitle>Nickname taken</AlertTitle>
        Try a different name nerd
      </Alert>}
    </main>
  );
};

export default Login;
