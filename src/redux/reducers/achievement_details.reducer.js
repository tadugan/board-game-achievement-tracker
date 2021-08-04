const achievementDetailsReducer = (state = [], action) => {
    console.log('We got into achievementDetailsReducer'); // test
    switch (action.type) {
      case 'SET_GAME_ACHIEVEMENTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default achievementDetailsReducer;