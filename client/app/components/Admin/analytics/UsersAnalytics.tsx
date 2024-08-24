"use client";
import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useGetUserAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import Loader from "../../Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUserAnalyticsQuery({});
  const analyticsData =
    data?.users.Last12Months?.map((item: any) => ({
      name: item.month,
      count: item.count,
    })) || [];

  return isLoading ? (
    <Loader />
  ) : (
    <div
      className={`${
        !isDashboard
          ? "mt-[50px]"
          : "mt-[50px] dark:bg-[#111c43] shadow-sm pb-5 rounded-lg"
      }`}
    >
      <div className={`${isDashboard ? "mb-5 px-5" : ""}`}>
        <h1
          className={`text-2xl font-semibold ${
            isDashboard ? "text-gray-900 dark:text-white" : ""
          }`}
        >
          User Analytics
        </h1>
        {!isDashboard && (
          <p className="text-lg text-gray-500">Last 12 months analytics data</p>
        )}
      </div>

      <div
        className={`w-full ${
          isDashboard ? "h-[30vh]" : "h-screen"
        } flex items-center justify-center`}
      >
        <ResponsiveContainer
          width={isDashboard ? "100%" : "90%"}
          height={isDashboard ? "100%" : "50%"}
        >
          <AreaChart
            data={analyticsData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#ffd900"
              fill="#ffd900"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAnalytics;
