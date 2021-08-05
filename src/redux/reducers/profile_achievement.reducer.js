const profileAchievementReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PROFILE_ACHIEVEMENTS':
        return action.payload;
      default:
        return state;
    }
  };

  export default profileAchievementReducer;