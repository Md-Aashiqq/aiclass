export const reducer = (state, action) => {
  switch (action.type) {
    case "PUTUSERDETAIL":
      return { ...state, userDetail: action.userDetail };
    case "SETISHOST":
      return { ...state, isHost: action.value };
   
    default:
      return state;
  }
};

export const initialState = {
  userDetail: null,
  userID: "",
  isHost:false,
};
