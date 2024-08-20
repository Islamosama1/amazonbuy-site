import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    messageClear,
    seller_change_password_and_email,
  } from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
const ChangePassword = () => {
  const [state, setState] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const dispatch = useDispatch();
  const { userInfo, loader, successMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = (e) => {
    e.preventDefault();
    // console.log(state);
    dispatch(seller_change_password_and_email(state));
  };

  return (
    <div className="p-4 bg-white" dir="rtl">
      <h2 className="text-xl text-slate-600 pb-5">تغيير كلمة المرور او البريد الالكتروني</h2>

      <form onSubmit={changePassword}>
        <div className="flex flex-col w-full gap-1 mb-2">
          <label htmlFor="email">البريد الالكتروني</label>
          <input
            value={state.email}
            onChange={inputHandle}
            className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            type="email"
            name="email"
            id="email"
            placeholder="البريد الالكتروني"
          />
        </div>

        <div className="flex flex-col w-full gap-1 mb-2">
          <label htmlFor="o_password">كلمة المرور القديمة</label>
          <input
            value={state.oldPassword}
            onChange={inputHandle}
            className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            type="password"
            name="oldPassword"
            id="o_password"
            placeholder="كلمة المرور القديمة"
          />
        </div>

        <div className="flex flex-col w-full gap-1 mb-2">
          <label htmlFor="n_password">كلمة المرور الجديدة</label>
          <input
            value={state.newPassword}
            onChange={inputHandle}
            className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            type="password"
            name="newPassword"
            id="n_password"
            placeholder="كلمة المرور الجديدة"
          />
        </div>

        <button
          className="bg-red-500  hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2"
          type="submit"
        >
          حفظ
        </button>
      </form>

      {/* <form>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="old_password">كلمة المرور القديمة</label>
          <input
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
            type="password"
            name="old_password"
            id="old_password"
            placeholder="Old Password"
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="new_password">كلمة المرور الجديدة</label>
          <input
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
            type="password"
            name="new_password"
            id="new_password"
            placeholder="New Password"
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="confirm_password">تأكيد كلمة المرور</label>
          <input
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <button className="px-8 py-2 bg-[#059473] shadow-lg hover:shadow-green-500/30 text-white rounded-md">
            Update Password{" "}
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default ChangePassword;
