import TextField from "@mui/material/TextField/TextField";
import { FC, useEffect } from "react";
import { useInput } from "../../hooks/useInput";

interface Props {
  initialName: string;
  onChange: (name: string) => void;
}

const TeamName: FC<Props> = ({ initialName, onChange }) => {
  const { value: name, setValue: setName, bind: bindInput } = useInput("");

  useEffect(() => {
    setName(initialName);
  }, [initialName, setName]);

  useEffect(() => {onChange(name)}, [name, onChange])

  return <TextField variant="standard" {...bindInput} label="team name" sx={{ margin: 1 }} />;
};

export default TeamName;
