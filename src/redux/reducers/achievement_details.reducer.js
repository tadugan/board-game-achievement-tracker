const achievementDetailsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GAME_ACHIEVEMENTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default achievementDetailsReducer;