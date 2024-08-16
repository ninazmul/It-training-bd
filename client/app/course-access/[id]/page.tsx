"use client";

import CourseContent from "@/app/components/Course/CourseContent";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const { id } = params;

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (isLoading) return;

    if (error) {
      redirect("/");
      return;
    }

    if (data) {
      const isPurchased = data.courses.find((item: any) => item._id === id);
      if (!isPurchased) {
        redirect("/");
      }
    } else {
      redirect("/");
    }
  }, [data, error, id, isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {data && (
            <CourseContent
              id={id}
              user={data}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Page;
