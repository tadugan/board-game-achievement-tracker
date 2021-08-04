const boardgameReducer = (state = [], action) => {
    console.log('We got into boardgameReducer'); // test
    switch (action.type) {
      case 'SET_ALL_BOARDGAMES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default boardgameReducer;