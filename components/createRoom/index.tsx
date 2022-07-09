import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { FC, FormEventHandler, useEffect } from "react";
import { createRoom } from "../../api/roomsApi";
import { useInput } from "../../hooks/useInput";
import { User } from "../../models";

interface Props {
  user: User;
}

const CreateRoom: FC<Props> = ({ user }) => {
  const { value: roomToAdd, setValue: setRoomToCreate, bind } = useInput("");
  const router = useRouter();

  useEffect(() => {
    setRoomToCreate(`${user.name}'s room`);
  }, [setRoomToCreate, user]);

  const createNewRoom = async (roomName: string) => { 
    try {
      const { id, name } = await createRoom(roomName);
      router.push({ pathname: "/room", query: { id } }, `/room/${name.replaceAll(" ", "-")}`); // TODO: add "as" but have ability to refresh
      console.log(`created room with id ${id}`);
    } catch (error) {
      console.error("failed to create new room");
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    createNewRoom(roomToAdd);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField variant="standard" {...bind} label="room name" sx={{ margin: 1 }} />
      <Button type="submit" sx={{ width: "20ch" }}>
        <b>Create Room</b>
      </Button>
    </form>
  );
};

export default CreateRoom;
