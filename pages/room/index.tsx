import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { useRoom } from "../../hooks/useRoom";
import Guesses from "../../components/guesses";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Teams from "../../components/teams";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import theme from "../../src/theme";
import useUser from "../../hooks/useUser";

const Room: FC = () => {
  const router = useRouter();
  const { room, isLoading, isError, leaveRoom, participantCount } = useRoom(
    router.query.id as string
  );
  const { user } = useUser();

  const isUserTeamInRoom = useMemo(() => {
    if (!isLoading || isError) return room.teams.map((team) => team.id).includes(user.teamId ?? "");
    return false;
  }, [isLoading, isError, room?.teams, user.teamId]);

  if (isLoading || isError) return <h1></h1>;
  // TODO: add proper handling

  return (
    <>
      <Button
        onClick={leaveRoom}
        sx={{
          alignSelf: "flex-start",
          borderRadius: "50%",
        }}
      >
        <Avatar
          sx={{
            height: { xs: "1.9rem", sm: "2.5rem" },
            width: { xs: "1.9rem", sm: "2.5rem" },
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <ArrowBackIcon />
        </Avatar>
      </Button>
      <Typography variant="h3" sx={{ my: 4, textAlign: "center" }}>
        <span key={participantCount} className="flip-animate">
          {room.name} With <span data-hover={participantCount}>{participantCount}</span> Players
        </span>
      </Typography>
      <Teams room={room} isUserTeamInRoom={isUserTeamInRoom} />
      <Guesses room={room} isUserTeamInRoom={isUserTeamInRoom} />
    </>
  );
};

export default Room;
