const NewsReducer = (initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALAN_INSTANCE': {
      return {
        ...initState,
        alanInstance: payload.alanInstance,
      };
    }
    default:
      return {
        ...initState,
      };
  }
};

export default NewsReducer;
