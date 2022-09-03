import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FC, FormEventHandler, useRef } from "react";
import { useInput } from "../../hooks/useInput";

interface Props {
  handleGuess: (guess: string) => void;
}

const MakeGuess: FC<Props> = ({ handleGuess }) => {
  const { value: word, bind, reset } = useInput("");
  const input = useRef<HTMLInputElement>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const guess = word.trim();
    if (guess) handleGuess(guess);
    reset();
    input.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        inputRef={input}
        variant="outlined"
        {...bind}
        label="make your guess"
        sx={{ direction: "rtl" }}
        autoComplete="off"
        type={"search"}
        InputProps={{ sx: { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ width: "15ch", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      >
        <b>guess</b>
      </Button>
    </form>
  );
};

export default MakeGuess;
