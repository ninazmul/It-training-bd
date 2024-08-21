import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "../components/Loader/Loader";

export default function useUserAuth() {
  const { data: userData, isLoading } = useLoadUserQuery(undefined, {});

  if (isLoading) return <Loader />;

  return Boolean(userData?.data);
}
