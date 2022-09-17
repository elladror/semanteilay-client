import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Dispatch, FC, MouseEventHandler, SetStateAction, useRef } from "react";
import { useInput } from "../../hooks/useInput";

interface Props {
  handleGuess: (guess: string) => void;
  relate: Dispatch<SetStateAction<boolean>>;
  isUserTeamInRoom: boolean;
}

const MakeGuess: FC<Props> = ({ handleGuess, relate, isUserTeamInRoom }) => {
  const { value: word, bind, reset } = useInput("");
  const input = useRef<HTMLInputElement>();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const guess = word.trim();
    if (guess) handleGuess(guess);
    reset();
    input.current?.focus();
  };

  return (
    <>
      {isUserTeamInRoom && (
        <form onFocus={() => relate(true)} onBlur={() => relate(false)}>
          <Box
            sx={{
              marginTop: { sm: "3rem", xs: "1rem" },
              marginBottom: "1.5rem",
              fontSize: "2rem",
              display: "flex",
              textAlign: "center",
            }}
          >
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
              type="button"
              onClick={handleSubmit}
              sx={{ width: "15ch", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              <b>guess</b>
            </Button>
          </Box>
        </form>
      )}
    </>
  );
};

export default MakeGuess;
