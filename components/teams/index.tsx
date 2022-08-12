import { Box } from "@mui/material";
import { FC, useState } from "react";
import useTeam from "../../hooks/useTeam";
import useUser from "../../hooks/useUser";
import { Room } from "../../models";
import TeamComponent from "../teamComponent";

interface Props {
  room: Room;
}

const Teams: FC<Props> = ({ room }) => {
  const { switchTeam } = useTeam();
  const { user } = useUser();
  const [isLoading, setLoading] = useState(false);

  return (
    <Box
      sx={{
        display: { xs: "-webkit-box", sm: "flex" },
        gap: 1,
        maxWidth: { xs: 300, sm: 600, md: 900, lg: 1100 },
        scrollSnapType: "x mandatory",
        "& > *": {
          scrollSnapAlign: "center",
        },
        flexWrap: { sm: "wrap" },
        justifyContent: { sm: "space-evenly" },
        overflow: { xs: "auto", sm: "initial" },
        ":last-child": { paddingInlineEnd: 1 },
        "&::-webkit-scrollbar": {
          width: "0.5em",
        },
      }}
    >
      {room.teams.map((team) => (
        <TeamComponent
          key={team.id}
          team={team}
          disabled={isLoading}
          onClick={async () => {
            setLoading(true);
            await switchTeam(team.id);
            setLoading(false);
          }}
          isCurrentTeam={user.teamId === team.id}
        ></TeamComponent>
      ))}
    </Box>
  );
};

export default Teams;
