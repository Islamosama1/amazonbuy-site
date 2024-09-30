import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { reset_password } from "../store/reducers/authReducer";
import { messageClear } from "../store/reducers/authReducer";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({
    password: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (token) {
      dispatch(reset_password({ token, info: state }));
    } else {
      console.error("Token is not available");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
        navigate("/");
    } else if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
        // navigate("/login");
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
          <FadeLoader />
        </div>
      )}
      <div className="bg-white p-8 rounded-lg shadow-md">
        {/* <h1 className="text-2xl font-bold text-center mb-4">تنشيط حسابك</h1>
        <p className="text-center text-gray-600 mb-8">
          اضغط على الزر لتنشيط حسابك
        </p>
        <button
          onClick={handleClick}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          تنشيط
        </button> */}

        <form onSubmit={handleClick} className="text-slate-600">
          <div className="flex flex-col gap-1 mb-2">
            <label htmlFor="password">كلمة المرور الجديدة</label>
            <input
              onChange={inputHandle}
              value={state.password}
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              required
            />
          </div>

          {/* <div className="flex flex-col gap-1 mb-2">
            <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
            <input
              onChange={inputHandle}
              value={state.confirmPassword}
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="confirmPassword"
              required
            />
          </div> */}

          <button className="px-8 w-full py-2 bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md">
            تأكيد
          </button>
        </form>
        {/* {activationError && (
          <p className="text-red-500 text-center mt-4">{activationError}</p>
        )} */}
      </div>
    </div>
  );
};

export default ResetPassword;
