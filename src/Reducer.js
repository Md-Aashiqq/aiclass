export const reducer = (state, action) => {
  switch (action.type) {
    case "PUTUSERDETAIL":
      return { ...state, userDetail: action.userDetail };
    case "PUTUSERID":
      return { ...state, userID: action.userID };
    case "ADDAUTH":
      return { ...state, isLogin: true, token: action.token };
    case "BILLCOUNTINCR":
      return { ...state, billCount: action.billCount };
    default:
      return state;
  }
};

export const initialState = {
  userDetail: null,
  userID: "",
  isLogin: false,
  token: null,
  billCount: 0,
};
