import { Button, TextField } from "@mui/material";
import { FC, FormEventHandler } from "react";
import { useInput } from "../../hooks/useInput";

interface Props {
  handleGuess: (guess: string) => void;
}

const MakeGuess: FC<Props> = ({ handleGuess: handleCreate }) => {
  const { value: roomToAdd, bind, reset } = useInput("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleCreate(roomToAdd);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="standard"
        {...bind}
        label="make your guess"
        sx={{ margin: 1, direction: "rtl" }}
      />
      <Button variant="contained" type="submit" sx={{ width: "15ch" }}>
        <b>guess</b>
      </Button>
    </form>
  );
};

export default MakeGuess;
