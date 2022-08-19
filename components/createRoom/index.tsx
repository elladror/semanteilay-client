import { Button, TextField } from "@mui/material";
import { FC, FormEventHandler, useContext, useEffect } from "react";
import { createRoom } from "../../api/roomsApi";
import { SocketContext } from "../../context/socket";
import { useInput } from "../../hooks/useInput";
import { useRooms } from "../../hooks/useRooms";
import useUser from "../../hooks/useUser";

const CreateRoom: FC = () => {
  const { value: roomToAdd, setValue: setRoomToCreate, bind } = useInput("");
  const socket = useContext(SocketContext);
  const { joinRoom } = useRooms();
  const { user } = useUser();

  useEffect(() => {
    setRoomToCreate(`${user.name}'s room`);
  }, [setRoomToCreate, user.name]);

  const createNewRoom = async (roomName: string) => {
    try {
      const { id } = await createRoom(roomName);
      socket.emit("create-room");
      await joinRoom(id);
    } catch (error) {
      console.error("failed to create new room"); // TODO: add normal indication
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
