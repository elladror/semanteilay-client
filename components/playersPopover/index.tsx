import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FC } from "react";
import Badge from "@mui/material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import { User } from "../../models";
import CircleIcon from "@mui/icons-material/Circle";
import Box from "@mui/material/Box";

interface Props {
  memberCount: number | undefined;
  members: User[];
}

const PlayersPopover: FC<Props> = ({ memberCount, members }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button onClick={handleClick}>
        <Badge badgeContent={memberCount ?? 0} color="primary">
          <PersonIcon color="action" />
        </Badge>
      </Button>
      <Popover
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        id={id}
      >
        <Box
          sx={{
            width: "10rem",
            minHeight: "4rem",
            p: "0.5rem",
          }}
        >
          {[...members]
            .sort(
              ({ status: a }, { status: b }) => (a === "IDLE" ? 1 : -1) - (b === "IDLE" ? 1 : -1)
            )
            .map((member) => (
              <Box
                key={member.id}
                sx={{
                  paddingInline: "1rem",
                  pb: "0.2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="500" variant="body1">
                  {member.name}
                </Typography>
                <CircleIcon
                  fontSize="small"
                  color={member.status === "ACTIVE" ? "success" : "disabled"}
                />
              </Box>
            ))}
        </Box>
      </Popover>
    </>
  );
};

export default PlayersPopover;
