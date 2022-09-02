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
        variant="outlined"
        {...bind}
        label="make your guess"
        sx={{ direction: "rtl" }}
        autoComplete="off"
        type={"search"}
        InputProps={{ sx: { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
      />
      <Button
        disabled={disable}
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
