"use client";

import {
  useGetAllOrdersQuery,
  useUpdateOrderPaymentStatusMutation,
} from "@/redux/features/orders/orderApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { Box, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";
import Loader from "../../Loader/Loader";
import { toast } from "react-hot-toast";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme } = useTheme();
  const { isLoading, data, refetch } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const [orderData, setOrderData] = useState<any[]>([]);
  const [updateOrderPaymentStatus] = useUpdateOrderPaymentStatusMutation();

  useEffect(() => {
    if (data?.orders && usersData?.users && coursesData?.courses) {
      const temp = data.orders.map((order: any) => {
        const user = usersData.users.find(
          (user: any) => user._id === order.userId
        );
        const course = coursesData.courses.find(
          (course: any) => course._id === order.items[0].productId
        );

        return {
          ...order,
          userName: user?.name || "Unknown",
          userEmail: user?.email,
          phone: order.paymentInfo?.phoneNumber || "N/A",
          title: course?.name || "N/A",
          price: `$${order.totalAmount || course?.price || "N/A"}`,
          transactionId: order.paymentInfo?.transaction_id || "N/A",
          isPaid: order.isPaid ? "Yes" : "No",
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);


  const handleTogglePaymentStatus = async (
    orderId: string,
    currentStatus: boolean
  ) => {
    try {
      const updatedStatus = !currentStatus;
      await updateOrderPaymentStatus({ orderId, isPaid: updatedStatus });
      toast.success("Payment status updated successfully!");
      refetch(); // Refetch data after update
    } catch (error) {
      toast.error("Failed to update payment status");
      console.error("Failed to update payment status", error);
    }
  };

  const columns = [
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "phone", headerName: "Phone", flex: 0.5 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    { field: "transactionId", headerName: "Transaction ID", flex: 0.7 },
    {
      field: "isPaid",
      headerName: "Paid",
      flex: 0.3,
      renderCell: (params: any) => (
        <Switch
          checked={params.row.isPaid === "Yes"}
          onClick={(event) => event.stopPropagation()} // Stop event propagation
          onChange={() =>
            handleTogglePaymentStatus(
              params.row.id,
              params.row.isPaid === "Yes"
            )
          }
          color="primary"
        />
      ),
    },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: "emailLink",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => (
              <a href={`mailto:${params.row.userEmail}`}>
                <AiOutlineMail
                  className={`mt-4 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                  size={20}
                />
              </a>
            ),
          },
        ]),
  ];

  const rows = orderData.map((order: any) => ({
    id: order._id,
    userName: order.userName,
    userEmail: order.userEmail,
    phone: order.phone,
    title: order.title,
    price: order.items[0].price,
    transactionId: order.transactionId,
    isPaid: order.isPaid,
    created_at: format(order.createdAt),
  }));

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column-cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-next": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection={!isDashboard}
              rows={rows}
              columns={columns}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
