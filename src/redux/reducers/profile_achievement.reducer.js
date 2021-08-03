const profileAchievementReducer = (state = [], action) => {
    console.log('We got into profileAchievementReducer'); // test
    switch (action.type) {
      case 'SET_PROFILE_ACHIEVEMENTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.profileAchievement
  export default profileAchievementReducer;