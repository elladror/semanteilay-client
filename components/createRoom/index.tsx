import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { ApiError } from "next/dist/server/api-utils";
import { FC, FormEventHandler, useContext, useEffect, useState } from "react";
import { createRoom } from "../../api/roomsApi";
import { SocketContext } from "../../context/socket";
import useApi from "../../hooks/useApi";
import { useInput } from "../../hooks/useInput";
import { useRooms } from "../../hooks/useRooms";
import useUser from "../../hooks/useUser";

const CreateRoom: FC = () => {
  const { value: roomToAdd, setValue: setRoomToCreate, bind, error: inputError } = useInput("");
  const socket = useContext(SocketContext);
  const { joinRoom } = useRooms();
  const { user } = useUser();
  const [warning, setWarning] = useState<string | null>(null);
  const [createRoomRequest, isCreateRoomLoading, createRoomError] = useApi(createRoom);
  const [joinRoomRequest, isJoinRoomLoading, joinRoomError] = useApi(joinRoom);

  const isLoading = isCreateRoomLoading || isJoinRoomLoading;
  const error = createRoomError || joinRoomError;

  useEffect(() => {
    setRoomToCreate(`${user.name}'s room`);
  }, [setRoomToCreate, user.name]);

  const createNewRoom = async (roomName: string) => {
    setWarning(null);

    try {
      const { id } = await createRoomRequest(roomName);
      socket.emit("create-room");
      await joinRoomRequest({ roomId: id, userId: user.id });
    } catch (error) {
      if ((error as ApiError).statusCode === 409) {
        setWarning("Room name taken");
      }
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!inputError) createNewRoom(roomToAdd);
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", marginBottom: 3 }}>
            <TextField variant="standard" {...bind} label="room name" sx={{ marginRight: 1 }} />
            <Button disabled={isLoading} type="submit" sx={{ width: "20ch" }}>
              <b>Create Room</b>
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
            {error.message}
          </Alert>
        )
      )}
    </Box>
  );
};

export default CreateRoom;
