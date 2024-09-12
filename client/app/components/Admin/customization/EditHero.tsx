"use client";
import { styles } from "@/app/styles/styles";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title || "");
      setSubTitle(data?.layout?.banner.subTitle || "");
      setImage(data?.layout?.banner?.image?.url || "");
    }
    if (isSuccess) {
      setLoading(false);
      refetch();
      toast.success("Hero updated successfully");
    }
    if (error) {
      setLoading(false);
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          setImage(e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    setLoading(true); // Set loading state to true
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  const hasChanges =
    data?.layout?.banner?.title !== title ||
    data?.layout?.banner?.subTitle !== subTitle ||
    data?.layout?.banner?.image?.url !== image;

  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center text-black dark:text-white py-10 lg:py-20 px-5">
      <div className="relative w-full flex flex-col items-center lg:items-start text-center lg:text-left p-4 space-y-6 z-10 mt-4 bg-white dark:bg-[#111c43] shadow-lg rounded-lg">
        <textarea
          className="px-4 py-2 focus:outline-none dark:text-white text-black w-full font-bold text-4xl lg:text-5xl bg-transparent resize-none border border-gray-300 dark:border-gray-700 rounded-md"
          rows={4}
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="px-4 py-2 focus:outline-none dark:text-white text-black w-full font-medium text-lg lg:text-xl bg-transparent border border-gray-300 dark:border-gray-700 rounded-md"
          placeholder="Enter Subtitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <div className="relative w-full max-w-md mt-4">
          <input
            type="file"
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="hidden"
          />
          <label
            htmlFor="banner"
            className="absolute bottom-0 right-0 z-20 cursor-pointer"
          >
            <AiOutlineCamera className="text-xl text-gray-700 dark:text-gray-400" />
          </label>
          {image ? (
            <img
              src={image}
              alt="Hero Image"
              className="object-cover w-full max-w-sm h-auto rounded-md shadow-sm"
            />
          ) : (
            <div className="w-full max-w-sm h-[350px] flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md shadow-sm">
              No Image Available
            </div>
          )}
        </div>
        <button
          className={`${
            styles.button
          } w-[120px] h-[45px] text-black bg-[#ffd900] hover:bg-[#d7b700]active:bg-[#d7b700] rounded-md transition duration-300 ease-in-out mt-4 ${
            hasChanges && !loading
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-50"
          }`}
          onClick={hasChanges && !loading ? handleEdit : () => null}
          disabled={!hasChanges || loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditHero;
