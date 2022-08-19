import { useRouter } from "next/router";
import { FC } from "react";
import { useRoom } from "../../hooks/useRoom";
import Guesses from "../../components/guesses";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Teams from "../../components/teams";
import Box from "@mui/material/Box";

const Room: FC = () => {
  const router = useRouter();
  const { room, isLoading, isError, leaveRoom, participantCount } = useRoom(
    (router.query.id as string) ?? "-"
  );

  if (isLoading || isError) return <h1></h1>;
  // TODO: add proper handling

  return (
    <>
      <IconButton color="secondary" onClick={leaveRoom} sx={{ alignSelf: "flex-start" }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h3" sx={{ my: 4 }}>
        <span key={participantCount} className="flip-animate">
          {room.name} With <span data-hover={participantCount}>{participantCount}</span> Players
        </span>
      </Typography>
      <Teams room={room} />
      <Guesses room={room} />
    </>
  );
};

export default Room;
