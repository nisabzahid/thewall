export const initialState = {
    reload: null,
    profile:null
  };

  const reducer = (state, action) => {
    console.log(action.type);
    switch (action.type) {
      case "RELOAE":
        return {
          ...state,
          reload: action.value,
        };
      case "PROFILE":
        return {
          ...state,
          profile: action.value,
        };

      default:
        return state;
    }
  };

  export default reducer;