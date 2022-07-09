import { FC, MouseEvent } from "react";
import styles from "./rooms.module.css";
import { useRouter } from "next/router";
import { useRooms } from "../../hooks/useRooms";
import Skeleton from "react-loading-skeleton";
import Typography from "@mui/material/Typography";

const Rooms: FC = () => {
  const router = useRouter();
  const { rooms, isError, isLoading } = useRooms();

  // TODO: add isEror isLoading and skeleton
  if (isError || isLoading)
    return (
      <h1>
        <Skeleton circle />
      </h1>
    );

  const enterRoom =
    ({ id, name }: { id: string; name: string }) =>
    (event: MouseEvent<HTMLDivElement>) => {
      router.push(
        {
          pathname: "/room",
          query: { id },
        }
        // `/room/${name.replaceAll(" ", "-")}`
      );
    };

  return (
    <div className={styles.grid}>
      {rooms.map(({ id, name }) => {
        return (
          <div key={id} className={styles.card} onClick={enterRoom({ id, name })}>
            <Typography variant="h2">{name}</Typography>
          </div>
        );
      })}
    </div>
  );
};

export default Rooms;
