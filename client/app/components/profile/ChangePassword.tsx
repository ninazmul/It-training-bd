import { styles } from "@/app/styles/styles";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {};

const ChangePassword = (props: Props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword !== newPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 text-black dark:text-white">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center text-black dark:text-white mb-6">
        Change Password
      </h1>
      <div className="max-w-md mx-auto">
        <form onSubmit={passwordChangeHandler} className="space-y-4">
          {[
            {
              label: "Enter your old password",
              value: oldPassword,
              setter: setOldPassword,
              show: showOldPassword,
              setShow: setShowOldPassword,
            },
            {
              label: "Enter your new password",
              value: newPassword,
              setter: setNewPassword,
              show: showNewPassword,
              setShow: setShowNewPassword,
            },
            {
              label: "Confirm your new password",
              value: confirmPassword,
              setter: setConfirmPassword,
              show: showConfirmPassword,
              setShow: setShowConfirmPassword,
            },
          ].map(({ label, value, setter, show, setShow }, index) => (
            <div className="relative" key={index}>
              <label className="block text-black dark:text-white mb-2">
                {label}
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white pr-10`}
                  required
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 dark:text-gray-300"
                >
                  {show ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-md"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
