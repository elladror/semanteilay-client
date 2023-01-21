import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { useRoom } from "../../hooks/useRoom";
import Guesses from "../../components/guesses";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Teams from "../../components/teams";
import theme from "../../src/theme";
import useUser from "../../hooks/useUser";
import MakeGuess from "../../components/makeGuess";
import { useGuesses } from "../../hooks/useGuesses";
import Box from "@mui/material/Box";
import useDetectIOS from "../../hooks/useDetectIOS";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { ApiError } from "next/dist/server/api-utils";
import useApi from "../../hooks/useApi";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";

const Room: FC = () => {
  const router = useRouter();
  const { room, isLoading, isError, leaveRoom, participantCount } = useRoom(
    router.query.id as string
  );
  const { user } = useUser();
  const [isGuessing, setGuessing] = useState(false);
  const isIOS = useDetectIOS();
  const [dontKnowWord, setDontKnowWord] = useState<string | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [existingGuess, setExistingGuess] = useState<string | null>(null);
  const [leaveRoomRequest, isLeaveRoomLoading] = useApi(leaveRoom);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isUserTeamInRoom =
    isLoading || isError ? false : room.teams.map(({ id }) => id).includes(user.teamId ?? "");

  const { guesses, addGuess, correctWord } = useGuesses({ isUserTeamInRoom, roomId: room?.id });

  const leaveRoomHandler = useCallback(() => {
    leaveRoomRequest().catch((_e) => {
      //
    });
  }, [leaveRoomRequest]);

  if (isLoading || isError) return <h1></h1>;
  // TODO: add proper handling

  return (
    <>
      <Collapse timeout={500} easing={"ease-in-out"} in={!(isGuessing && !isIOS)}>
        {isMobile && (
          <IconButton
            onClick={leaveRoomHandler}
            disabled={isLeaveRoomLoading}
            color="secondary"
            sx={{ position: "absolute", left: "1rem" }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h3" sx={{ mt: 4, textAlign: "center" }}>
          {room.name}
        </Typography>
        <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
          <span key={participantCount} className="flip-animate">
            With <span data-hover={participantCount}>{participantCount}</span>
            {participantCount > 1 ? " Players" : " Player"}
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
        {dontKnowWord && <Alert severity="info">{`Don't know the word ${dontKnowWord}`}</Alert>}
        {correctWord && (
          <Alert severity="success">{`Success! Today's word was: ${correctWord}`}</Alert>
        )}
        {error && (
          <Alert severity="error">
            <AlertTitle>Error occured</AlertTitle>
            {error.message}
          </Alert>
        )}
        {existingGuess && <Alert severity="info">{`Jinx! ${existingGuess} already guessed`}</Alert>}
        <MakeGuess
          isUserTeamInRoom={isUserTeamInRoom}
          relate={setGuessing}
          handleGuess={async (word: string) => {
            try {
              setDontKnowWord(null);
              setError(null);
              setExistingGuess(null);
              await addGuess({
                word,
                ownerId: user.id,
                teamId: user.teamId as string,
                roomId: room.id,
              });
            } catch (error) {
              const { statusCode } = error as ApiError;

              if (statusCode === 406) {
                setDontKnowWord(word);
              } else if (statusCode === 409) {
                setExistingGuess(word);
              } else {
                setError(error as ApiError);
              }
            }
          }}
        />
      </Box>
      <Guesses guesses={guesses} isUserTeamInRoom={isUserTeamInRoom} />
    </>
  );
};

export default Room;
