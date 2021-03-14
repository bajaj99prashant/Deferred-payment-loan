export const initialState = {
  amount: null,
  time: null,
  principal: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INTEREST_CALCULATED":
      return {
        ...state,
        amount: action.amount,
        time: action.time,
        principal: action.principal,
      };

    default:
      return state;
  }
};

export default reducer;
