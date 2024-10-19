"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Box, Button, Modal } from "@mui/material";
import { useTheme } from "next-themes";
import { styles } from "@/app/styles/styles";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "@/redux/features/blog/blogApi";

const AllBlogs = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const { isLoading, data, error, refetch } = useGetAllBlogsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteBlog, { isSuccess, error: errorDelete }] =
    useDeleteBlogMutation();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Blog Title", flex: 1 },
    { field: "description", headerName: "Descriptions", flex: 0.5 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: { row: { id: React.SetStateAction<string> } }) => (
        <Button
          onClick={() => {
            setOpen(true);
            setBlogId(params.row.id);
          }}
        >
          <AiOutlineDelete className="dark:text-white text-black" size={20} />
        </Button>
      ),
    },
  ];

  const rows =
    data?.blogs.map((item: { _id: any; title: any; description: any }) => ({
      id: item._id,
      title: item.title,
      description: item.description,
    })) || [];

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Blog deleted successfully");
      setOpen(false);
    }
    if (errorDelete) {
      toast.error("An error occurred while Delete Blog!");
    }
  }, [isSuccess, errorDelete, refetch]);

  const handleDelete = async () => {
    await deleteBlog(blogId);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
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
              "&.MuiDataGrid-root .MuiDataGrid-columnHeaders": {
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
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
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] gap-4 bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none flex flex-col justify-between">
              <h1 className={`${styles.title}`}>
                Are you sure you want to delete this blog?
              </h1>
              <div className="w-full flex justify-end gap-4">
                <Button
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </Box>
          </Modal>
        </Box>
      )}
    </div>
  );
};

export default AllBlogs;
