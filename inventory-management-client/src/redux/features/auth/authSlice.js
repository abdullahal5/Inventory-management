import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import auth from "../../../firebase.config";

const initialState = {
  email: "",
  name: "",
  isLoading: true,
  isError: false,
  isLoggedIn: false,
  error: "",
};

export const register = createAsyncThunk("auth/register", async (userData) => {
  const data = await createUserWithEmailAndPassword(
    auth,
    userData?.email,
    userData?.password
  );
  console.log(data.user)
  if (data.user) {
    await updateProfile(auth.currentUser, {
      displayName: userData?.name,
    });
    await authService.register(userData);
    return {
      email: data.user.email,
      name: data.user.displayName,
    };
  }
});

export const login = createAsyncThunk("auth/login", async (userData) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );

  const user = userCredential.user;

  return {
    email: user.email,
    name: user.displayName,
  };
});

// export const googleLogin = createAsyncThunk("auth/google-login", async () => {
//   const provider = new GoogleAuthProvider();
//   const result = await signInWithPopup(auth, provider);
//   return {
//     email: result.user.email,
//     name: result.user.displayName,
//   };
// });
export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isLoggedIn = false;
      state.error = "";
      state.email = "";
      state.name = "";
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.isLoggedIn = true;
      state.error = "";
      state.email = payload.email;
      state.name = payload.name;
      toast.success("Registered successfully");
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isLoggedIn = false;
      state.error = action.error.message;
      state.email = "";
      state.name = "";
      toast.error(action.error.message);
    });
    // login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isLoggedIn = false;
      state.error = "";
      state.email = "";
      state.name = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { email, name } = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isLoggedIn = true;
      state.error = "";
      state.email = email;
      state.name = name;
      toast.success("Login successfully");
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isLoggedIn = false;
      state.error = action.error.message;
      state.email = "";
      state.name = "";
      toast.error(action.error.message);
    });
  },
});

export const { setUser, toggleLoading, logout } = counterSlice.actions;

export default counterSlice.reducer;
