import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FC, FormEventHandler } from "react";
import { useInput } from "../../hooks/useInput";

interface Props {
  handleGuess: (guess: string) => void;
  disable: boolean;
}

const MakeGuess: FC<Props> = ({ handleGuess: handleCreate, disable }) => {
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
      <Button disabled={disable} variant="contained" type="submit" sx={{ width: "15ch" }}>
        <b>guess</b>
      </Button>
    </form>
  );
};

export default MakeGuess;
