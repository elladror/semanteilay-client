import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useInput } from "../../hooks/useInput";
import { useLocalStorage } from "usehooks-ts";
import useUser from "../../hooks/useUser";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Box } from "@mui/material";
import { ApiError } from "next/dist/server/api-utils";
import useApi from "../../hooks/useApi";
import Title from "../../components/title";
import { NextPage } from "next";

const nameMaxLength = 10;

const Login: NextPage = () => {
  const [lastNickname, setLastNickname] = useLocalStorage("last-nickname", "");
  const {
    value: name,
    setValue: setName,
    bind: bindInput,
    error: inputError,
  } = useInput("", nameMaxLength);
  const [warning, setWarning] = useState<string | null>(null);
  const router = useRouter();
  const { signUp } = useUser();
  const [signUpRequest, isLoading, error] = useApi(signUp);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    setName(lastNickname);
  }, [lastNickname, setName]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setWarning(null);

    if (name.length > nameMaxLength) {
      setWarning("Name longer than 10 characters");

      return;
    } else if (name.length === 0) {
      setWarning("You need to pick a name");

      return;
    } else if (inputError) {
      setWarning("Name contains illegal characters");

      return;
    }

    try {
      await signUpRequest({ name });
      setLastNickname(name);
      router.push("/");
    } catch (error) {
      if ((error as ApiError).statusCode === 409) {
        setWarning("Name Taken");
      }
    }
  };

  return (
    <main>
      <Title>Semanteilay</Title>
      <Box sx={{ textAlign: "center" }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", marginBottom: 3 }}>
            <TextField {...bindInput} label="nickname" sx={{ marginRight: 1 }} />
            <Button disabled={isLoading} type="submit">
              <b>Play</b>
            </Button>
          </Box>
        </form>
      </Box>
      {warning ? (
        <Alert severity="warning">
          <AlertTitle>Try a different name</AlertTitle>
          {warning}
        </Alert>
      ) : (
        error && (
          <Alert severity="error">
            <AlertTitle>Error occured</AlertTitle>
            Unable to reach server
          </Alert>
        )
      )}
    </main>
  );
};

export default Login;
