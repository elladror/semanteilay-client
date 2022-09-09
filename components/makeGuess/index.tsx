import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Dispatch, FC, FormEventHandler, SetStateAction, useRef } from "react";
import { useInput } from "../../hooks/useInput";

interface Props {
  handleGuess: (guess: string) => void;
  relate: Dispatch<SetStateAction<boolean>>;
}

const MakeGuess: FC<Props> = ({ handleGuess, relate }) => {
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
      <Box
        sx={{
          marginTop: "3rem",
          marginBottom: "1.5rem",
          fontSize: "2rem",
          display: "flex",
          textAlign: "center",
        }}
      >
        <TextField
          onFocus={() => {
            relate(true);
            setTimeout(() => {
              document.getElementById("teams")?.scrollIntoView(true);
            }, 0);
          }}
          onBlur={() => relate(false)}
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
      </Box>
    </form>
  );
};

export default MakeGuess;
