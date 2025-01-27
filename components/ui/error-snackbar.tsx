"use client";

import { setError } from "@/lib/redux/features/errorSlice";
import { RootState } from "@/lib/redux/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ErrorSnackbar = () => {
  const dispatch = useDispatch();

  const errorMessage = useSelector((state: RootState) => state.error.message);

  const onClose = useCallback(() => {
    dispatch(setError({ error_mesage: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [onClose, errorMessage]);

  if (!errorMessage) return null;

  return (
    <div className="absolute bottom-4 w-full">
      <div className="bg-red-100 text-red-500 px-6 py-1 rounded-lg shadow-md flex items-center justify-between space-x-4">
        <span className="text-xs">{errorMessage}</span>
        <button
          onClick={onClose}
          className="hover:bg-red-600 rounded-full py-1 px-2 focus:outline-none"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default ErrorSnackbar;
