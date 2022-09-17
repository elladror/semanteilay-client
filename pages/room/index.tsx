import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useRoom } from "../../hooks/useRoom";
import Guesses from "../../components/guesses";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Teams from "../../components/teams";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import theme from "../../src/theme";
import useUser from "../../hooks/useUser";
import MakeGuess from "../../components/makeGuess";
import { useGuesses } from "../../hooks/useGuesses";
import Box from "@mui/material/Box";
import { Collapse } from "@mui/material";
import useDetectIOS from "../../hooks/useDetectIOS";

const Room: FC = () => {
  const router = useRouter();
  const { room, isLoading, isError, leaveRoom, participantCount } = useRoom(
    router.query.id as string
  );
  const { user } = useUser();
  const [isGuessing, setGuessing] = useState(false);
  const isIOS = useDetectIOS();

  const isUserTeamInRoom =
    isLoading || isError ? false : room.teams.map(({ id }) => id).includes(user.teamId ?? "");

  const { guesses, addGuess } = useGuesses({ isUserTeamInRoom, roomId: room?.id });

  if (isLoading || isError) return <h1></h1>;
  // TODO: add proper handling

  return (
    <>
      <Collapse timeout={500} easing={"ease-in-out"} in={!(isGuessing && !isIOS)}>
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
      </Collapse>
      <Teams room={room} isUserTeamInRoom={isUserTeamInRoom} isGuessing={isGuessing} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MakeGuess
          isUserTeamInRoom={isUserTeamInRoom}
          relate={setGuessing}
          handleGuess={async (word: string) => {
            try {
              addGuess({
                word,
                ownerId: user.id,
                teamId: user.teamId as string,
                roomId: room.id,
              });
            } catch (err) {
              console.log("Don't know that word"); // TODO: implement don't know the word
            }
          }}
        />
      </Box>
      <Guesses guesses={guesses} isUserTeamInRoom={isUserTeamInRoom} />
    </>
  );
};

export default Room;
