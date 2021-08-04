const detailsReducer = (state = [], action) => {
    console.log('We got into detailsReducer'); // test
    switch (action.type) {
      case 'SET_GAME_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default detailsReducer;