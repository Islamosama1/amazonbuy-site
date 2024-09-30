import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { messageClear } from "../store/reducers/authReducer";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";

const ActivationComponent = () => {
  const navigate = useNavigate();
  const { errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userInfo);
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      console.log(userInfo);
      if (userInfo.isVerified) {
        navigate("/");
      } else {
        navigate("/activation");
      }
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isVerified) {
        navigate("/");
      } else {
        navigate("/activation");
      }
    }
  }, [userInfo]);
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <div className="relative mb-4 h-60 w-60 text-muted-foreground">
            <img
              src="https://amshopping.vercel.app/images/hippo-email-sent.png"
              alt="logo"
            />
          </div>
          <h3 className="font-semibold text-2xl">
            تفقد بريدك الإلكتروني , من فضلك
          </h3>
        </div>
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <div className="grid grid-cols-subgrid w-full mx-auto bg-white rounded-md px-16">
            <div className="py-8">
              <h2
                className="text-center w-full text-xl text-slate-600 font-bold"
                dir="rtl"
              >
                أو اذا كانت لديك مشكلة يمكنك:{" "}
              </h2>
              <a target="_blank" href="https://amshopping.vercel.app/login">
                <div className="w-full py-2 bg-[#02e3e0] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  تسجيل الدخول
                </div>
              </a>
              <a
                target="_blank"
                href="https://chat.whatsapp.com/DveeGhT3er6GvMvTnFNF2L"
              >
                <div className="px-8 w-full py-2 bg-[#ad2cc4] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  انضمام الي جروب الدعم
                  <span>
                    <FaWhatsapp />
                  </span>
                </div>
              </a>
              {/* <a target="_blank" href="https://amazonbuy-dashboard.vercel.app/register">
                <div className="w-full py-2 bg-[#ad2cc4] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  انشاء حساب كبائع
                </div>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationComponent;
