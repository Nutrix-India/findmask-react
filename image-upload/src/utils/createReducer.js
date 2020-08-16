const createReducer = ({ initialState, actionMap }) => {
  const reducer = (state = initialState, action) => {
    const actionHandler = actionMap[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  };
  return reducer;
};

export default createReducer;
