const userCollectionReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_COLLECTION':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default userCollectionReducer;