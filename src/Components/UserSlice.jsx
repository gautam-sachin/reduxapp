import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },

    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.splice(id, 1);
    },

    editUser: (state, action) => {
      const { id, firstName, lastName, message } = action.payload;

      const existingUser = state.find((user) => user.id === id);

      if (existingUser) {
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.message = message;
      }
    },
  },
});

export const { addUser, deleteUser, editUser } = UserSlice.actions;
export default UserSlice.reducer;
