"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useUploadBlogMutation } from "@/redux/features/blog/blogApi";
import { styles } from "@/app/styles/styles";

const CreateBlog: React.FC = () => {
  const [dragging, setDragging] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [uploadBlog] = useUploadBlogMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!thumbnail || !title || !description) {
      toast.error("Please provide all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const blogData = {
        image: thumbnail,
        title,
        description,
      };

      const response = await uploadBlog(blogData).unwrap();
      toast.success(response.message);

      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
      setThumbnail(null);
    } catch (error) {
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-24 mx-4 p-6 shadow-md rounded-md text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={`pb-1 ${styles.label}`}>Blog Title</label>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-transparent rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className={`pb-1 ${styles.label}`}>Blog Description</label>
          <textarea
            placeholder="Blog Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-transparent rounded-md"
            required
          />
        </div>
        <div className="w-full mb-4">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-[#ffd900]" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Thumbnail Preview"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 bg-[#ffd900] text-black font-bold rounded-md hover:bg-[#d7a61f] ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
