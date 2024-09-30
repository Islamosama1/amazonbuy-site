import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-register", info);
      localStorage.setItem("customerToken", data.token);
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method

export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-login", info);
      localStorage.setItem("customerToken", data.token);
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const customer_forget = createAsyncThunk(
  "auth/forget",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/forgot-password", info);
      // localStorage.setItem("customerToken", data.token);
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const activation = createAsyncThunk(
  "auth/activation",
  async (token, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/activate/:${token}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const reset_password = createAsyncThunk(
  "auth/reset",
  async ({ token, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const { data } = await api.post(`/reset-password/${token}`,
        info
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const seller_change_password_and_email = createAsyncThunk(
  "auth/seller_change_password_and_email",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("customerToken");

      if (!token) {
        return rejectWithValue({ error: "No token found" });
      }

      const { data } = await api.post(
        "/seller-change-password-and-email",
        info,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({
          error: "Network error or server not responding",
        });
      }
    }
  }
);

// end method

const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);
    console.log(userInfo);
    return userInfo;
  } else {
    return "";
  }
};
// End Method

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: decodeToken(localStorage.getItem("customerToken")),
    errorMessage: "",
    successMessage: "",
    token: localStorage.getItem("customerToken"),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customer_register.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(customer_register.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(customer_register.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token);
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })

      .addCase(customer_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(customer_login.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(customer_login.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token);
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })
      .addCase(customer_forget.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(customer_forget.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(customer_forget.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
      })

      .addCase(reset_password.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(reset_password.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(reset_password.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(activation.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(activation.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(activation.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.userInfo = payload.userInfo;
        state.loader = false;
      })
      .addCase(
        seller_change_password_and_email.pending,
        (state, { payload }) => {
          state.loader = true;
        }
      )
      .addCase(
        seller_change_password_and_email.rejected,
        (state, { payload }) => {
          state.errorMessage = payload.error;
          state.loader = false;
        }
      )
      .addCase(
        seller_change_password_and_email.fulfilled,
        (state, { payload }) => {
          state.successMessage = payload.message;
          state.loader = false;
        }
      );
  },
});
export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
