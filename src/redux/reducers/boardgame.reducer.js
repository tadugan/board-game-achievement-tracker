const boardgameReducer = (state = [{name: 'banana'}], action) => {
    switch (action.type) {
      case 'SET_ALL_BOARDGAMES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default boardgameReducer;