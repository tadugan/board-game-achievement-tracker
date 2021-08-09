const userAchievementReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_ACHIEVEMENTS':
        console.log('IN userAchievementReducer: SET_USER', state); // test
        console.log('action:', action); // test
        return action.payload;
      default:
        console.log('IN userAchievementReducer: DEFAULT', state); // test
        console.log('action is:', action); // test
        return state;
    }
  };

  export default userAchievementReducer;