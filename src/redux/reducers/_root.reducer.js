import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import profileAchievement from './profile_achievement.reducer';
import boardgames from './boardgame.reducer';
import gameDetails from './details.reducer';
import gameAchievements from './achievement_details.reducer';
import userAchievements from './user_achievement.reducer';
import userCollection from './user_collection.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  profileAchievement, // contains a list of recently completed achievements for the user profile
  boardgames, // contains all supported board games to display in the BoardgameList
  userCollection, // contains all the games in a user's collection
  gameDetails, // contains details for 1 game being viewed
  gameAchievements, // contains achievements for 1 game being viewed
  userAchievements, // contains all of a users achievements for 1 game
});

export default rootReducer;
