"use client";

import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationApi";
import React, { FC, useCallback, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { format } from "timeago.js";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

type Notification = {
  _id: string;
  title: string;
  message: string;
  status: string;
  createdAt: string;
};

type Props = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open = false, setOpen }) => {
  const { data, refetch } = useGetAllNotificationQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus] = useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const audio = new Audio(
    "https://res.cloudinary.com/dc9q2yi1s/video/upload/v1714814391/uf9ylzi2ca6prvaujmad.wav"
  );

  const playerNotificationSound = useCallback(() => {
    audio.play();
  }, [audio]);

  useEffect(() => {
    if (data?.notifications) {
      const unreadNotifications = data.notifications.filter(
        (item: Notification) => item.status === "unread"
      );
      setNotifications(unreadNotifications);
    }
  }, [data]);

  useEffect(() => {
    socket.on("newNotification", () => {
      refetch();
      playerNotificationSound();
    });

    return () => {
      socket.off("newNotification");
    };
  }, [playerNotificationSound, refetch]);

  const handleNotificationStatusChange = useCallback(
    async (id: string) => {
      await updateNotificationStatus(id);
      refetch(); // Ensure the list is updated after marking as read
    },
    [updateNotificationStatus, refetch]
  );

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-0 right-0 z-[999] border-b dark:border-[#ffffff1c] backdrop-blur-lg bg-opacity-75 shadow-xl transition duration-500">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen?.(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Toggle Notifications"
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        {notifications.length > 0 && (
          <span className="absolute -top-3 -right-2 bg-[#ff0055] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
            {notifications.length}
          </span>
        )}
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] dark:bg-[#111c43] bg-white shadow-xl absolute top-16 right-0 z-[1100] rounded overflow-y-auto">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notification's
          </h5>

          {notifications.map((item) => (
            <div
              className="dark:bg-[#2d3a4ea1] bg-[@00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] p-2"
              key={item._id}
            >
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">{item.title}</p>
                <button
                  className="text-black dark:text-white cursor-pointer text-sm"
                  onClick={() => handleNotificationStatusChange(item._id)}
                  aria-label={`Mark notification ${item.title} as read`}
                >
                  Mark as read
                </button>
              </div>
              <p className="px-2 text-black dark:text-white">{item.message}</p>
              <p className="p-2 text-black dark:text-white text-[14px]">
                {format(item.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
