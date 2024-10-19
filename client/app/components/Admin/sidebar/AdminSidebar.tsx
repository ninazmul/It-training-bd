"use client";

import { FC, useState, useEffect } from "react";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Avatar from "../../../../public/Avatar.png";
import logo from "../../../../public/IT logo.png";

// Import icons from MUI
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import WebIcon from "@mui/icons-material/Web";
import QuizIcon from "@mui/icons-material/Quiz";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Link from "next/link";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

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
        backgroundColor: selected === title ? "#ffd900" : "transparent",
        color: selected === title ? "#000" : "inherit",
        "&:hover": {
          backgroundColor: "#fdfd96",
          color: "#000",
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
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { theme } = useTheme();
  const router = useRouter();
  const isMdScreen = useMediaQuery("(max-width:960px)"); // md breakpoint is 960px

  // Automatically collapse on medium screens
  useEffect(() => {
    if (isMdScreen) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isMdScreen]);

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
    zIndex: 1000, // Ensures the sidebar is above other content
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
          justifyContent: isCollapsed ? "center" : "space-between",
          alignItems: "center",
          padding: "10px",
          backgroundColor: theme === "dark" ? "#0d1a3e" : "#f1f1f1",
        }}
      >
        {!isCollapsed && (
          <Link href={"/"}>
            <Image
              alt="IT Training BD Logo"
              width={40}
              height={40}
              src={logo}
              style={{
                cursor: "pointer",
              }}
            />
          </Link>
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
          <Link href={"/profile"}>
            <Image
              alt="profile-user"
              width={100}
              height={100}
              src={userData?.data?.avatar?.url || Avatar}
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                border: "3px solid #ffd900",
                objectFit: "cover",
              }}
            />
          </Link>

          <Typography
            sx={{
              marginTop: "10px",
              fontSize: "18px",
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            {userData?.data?.name}
          </Typography>
          <Typography
            sx={{ fontSize: "16px", color: theme === "dark" ? "#ddd" : "#555" }}
          >
            - {userData?.data?.role}
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
          title="Create Blog"
          to="/admin/create-blog"
          icon={
            <VideoCallIcon sx={{ color: theme === "dark" ? "#fff" : "#000" }} />
          }
          selected={selected}
          setSelected={setSelected}
        />
        <SidebarItem
          title="All Blogs"
          to="/admin/blogs"
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
          to="/admin/orders-analytics"
          icon={
            <BarChartOutlinedIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          }
          selected={selected}
          setSelected={setSelected}
        />
        {/* <SidebarItem
          title="Courses Logs"
          to="/admin/logs/courses-logs"
          icon={
            <ManageHistoryIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          }
          selected={selected}
          setSelected={setSelected}
        /> */}
        {/* <SidebarItem
          title="Orders Logs"
          to="/admin/logs/orders-logs"
          icon={
            <ManageHistoryIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          }
          selected={selected}
          setSelected={setSelected}
        /> */}
        {/* <SidebarItem
          title="Geo-Analytics"
          to="/admin/geo"
          icon={
            <MapOutlinedIcon
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
          }
          selected={selected}
          setSelected={setSelected}
        /> */}
        <Box
          onClick={logoutHandler}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
              color: "#f44336",
            },
          }}
        >
          <ExitToAppIcon sx={{ color: "#f44336" }} />
          <Typography sx={{ marginLeft: "10px", color: "#f44336" }}>
            Logout
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSidebar;
