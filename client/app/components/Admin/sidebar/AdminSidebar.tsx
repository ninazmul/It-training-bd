"use client";

import { FC, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation"; // For Next.js redirection
import { RxAvatar } from "react-icons/rx";
import { signOut } from "next-auth/react";

// Import icons from MUI
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import WebIcon from "@mui/icons-material/Web";
import QuizIcon from "@mui/icons-material/Quiz";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Link from "next/link";

interface SidebarItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (title: string) => void;
}

const SidebarItem: FC<SidebarItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => (
  <Link href={to} passHref>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        cursor: "pointer",
        backgroundColor: selected === title ? "#6870fa" : "transparent",
        color: selected === title ? "#fff" : "inherit",
        "&:hover": {
          backgroundColor: "#888dfb",
          color: "#fff",
        },
      }}
      onClick={() => setSelected(title)}
    >
      {icon}
      <Typography sx={{ marginLeft: "10px" }}>{title}</Typography>
    </Box>
  </Link>
);

const AdminSidebar: FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { theme } = useTheme();
  const router = useRouter();

  const sidebarStyles = {
    width: isCollapsed ? "60px" : "250px",
    transition: "width 0.3s",
    backgroundColor: theme === "dark" ? "#111C43" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    position: "fixed" as const,
    top: 0,
    left: 0,
    height: "100vh",
    overflowX: "hidden" as const,
    overflowY: "auto" as const,
  };

  const logoutHandler = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/");
  };

  return (
    <Box sx={sidebarStyles}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          backgroundColor: theme === "dark" ? "#0d1a3e" : "#f1f1f1",
        }}
      >
        {!isCollapsed && (
          <Typography
            variant="h5"
            sx={{ color: theme === "dark" ? "#fff" : "#000" }}
          >
            LMS
          </Typography>
        )}
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? (
            <ArrowForwardIosIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          ) : (
            <ArrowBackIosIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          )}
        </IconButton>
      </Box>
      {!isCollapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Image
            alt="profile-user"
            width={100}
            height={100}
            src={user.avatar ? user.avatar.url : "/default-avatar.png"}
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              border: "3px solid #5b6fe6",
              objectFit: "cover",
            }}
          />
          <Typography
            sx={{
              marginTop: "10px",
              fontSize: "18px",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            {user?.name}
          </Typography>
          <Typography
            sx={{ fontSize: "16px", color: theme === "dark" ? "#ddd" : "#555" }}
          >
            - {user?.role}
          </Typography>
        </Box>
      )}
      <Box>
        <SidebarItem
          title="Dashboard"
          to="/admin"
          icon={
            <HomeOutlinedIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          }
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="Users"
          to="/admin/users"
          icon={
            <GroupIcon sx={{ color: theme === "dark" ? "#fff" : "#000" }} />
          }
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="Invoices"
          to="/admin/invoices"
          icon={
            <ReceiptOutlinedIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          }
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="Create Course"
          to="/admin/create-course"
          icon={
            <VideoCallIcon sx={{ color: theme === "dark" ? "#fff" : "#000" }} />
          }
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="Live Courses"
          to="/admin/courses"
          icon={
            <OndemandVideoIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          }
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="Hero"
          to="/admin/hero"
          icon={<WebIcon sx={{ color: theme === "dark" ? "#fff" : "#000" }} />}
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="FAQ"
          to="/admin/faq"
          icon={<QuizIcon sx={{ color: theme === "dark" ? "#fff" : "#000" }} />}
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="Categories"
          to="/admin/categories"
          icon={
            <WysiwygIcon sx={{ color: theme === "dark" ? "#fff" : "#000" }} />
          }
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="Manage Team"
          to="/admin/team"
          icon={
            <PeopleOutlinedIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          }
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="Courses Analytics"
          to="/admin/courses-analytics"
          icon={
            <BarChartOutlinedIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          }
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="Order Analytics"
          to="/admin/order-analytics"
          icon={
            <MapOutlinedIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          }
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="User Analytics"
          to="/admin/user-analytics"
          icon={
            <ManageHistoryIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          }
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="Settings"
          to="/admin/settings"
          icon={
            <SettingsIcon sx={{ color: theme === "dark" ? "#fff" : "#000" }} />
          }
          selected={selected}
          setSelected={setSelected}
        />
        <Box
          sx={{
            marginTop: "auto",
            padding: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: theme === "dark" ? "#1f2a48" : "#e0e0e0",
            },
          }}
          onClick={logoutHandler}
        >
          <ExitToAppIcon sx={{ color: theme === "dark" ? "#fff" : "#000" }} />
          <Typography
            sx={{
              marginLeft: "10px",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            Logout
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSidebar;
