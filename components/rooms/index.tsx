import { FC, MouseEventHandler } from "react";
import styles from "./rooms.module.css";
import Typography from "@mui/material/Typography";
import { Room } from "../../models";
import { useRooms } from "../../hooks/useRooms";
import useUser from "../../hooks/useUser";
import Skeleton from "@mui/material/Skeleton";

interface RoomsProps {
  rooms: Room[];
}

const Rooms: FC<RoomsProps> = ({ rooms }) => {
  const { joinRoom } = useRooms();
  const { user } = useUser();

  const enterRoom =
    (roomId: string): MouseEventHandler<HTMLDivElement> =>
    (_event) => {
      try {
        joinRoom({ roomId, userId: user.id });
      } catch (error) {
        console.error("couldn't join room"); // TODO: implement normally
      }
    };

  return (
    <div className={styles.grid}>
      {!rooms
        ? [1, 2, 3, 4].map((key) => <Skeleton key={key} className={styles.card} />)
        : rooms.map(({ id: roomId, name }) => {
            return (
              <div key={roomId} className={styles.card} onClick={enterRoom(roomId)}>
                <Typography variant="h2">{name}</Typography>
              </div>
            );
          })}
    </div>
  );
};

export default Rooms;
