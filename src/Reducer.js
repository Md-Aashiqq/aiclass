export const reducer = (state, action) => {
  switch (action.type) {
    case "PUTUSERDETAIL":
      return { ...state, userDetail: action.load };
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
  isLogin: false,
  token: null,
  billCount: 0,
};
