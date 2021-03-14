export const initialState = {
  amount: null,
  time: null,
  principal: null,
  count: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INTEREST_CALCULATED":
      return {
        ...state,
        amount: action.amount,
        time: action.time,
        principal: action.principal,
        count: state.count + 1,
      };

    default:
      return state;
  }
};

export default reducer;
