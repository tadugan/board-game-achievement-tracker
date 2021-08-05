import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const achievements = useSelector(store => store.profileAchievement);

  const history = useHistory();
  const dispatch = useDispatch();


  // Sends the user to a destination component when a button is pressed
  const handleClick = (destination) => {
    console.log('click'); // test
    
    history.push(destination);
  }

  // GETs achievements to display on the user's profile
  const getProfileAchievements = () => {
    console.log('in getProfileAchievements'); // test

    dispatch({ type: 'GET_PROFILE_ACHIEVEMENTS'});
  }

  useEffect(() => {
    getProfileAchievements();
  }, []);

  return (
    <div className="container">
      <img src={user.profile_image_url} height="100px" />
      <br />
      <h3>{user.first_name} {user.last_name}</h3>
      <h4>Current Favorite Game: {user.current_favorite_game}</h4>
      <h5>Recent Achievements</h5>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Achievement</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map((achievement, index) => {
            return (
              <tr key={index}>
                <td>{achievement.name}</td>
                <td>{achievement.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button 
        type="button"
        onClick={() => handleClick('/boardgame')}
        variant="contained"
      >
        View Collection
      </Button>
      <br />
      <Button 
        type="button"
        onClick={() => handleClick('/boardgame')}
        variant="contained"
      >
        Add New Game
      </Button>
      <br />
      <Button 
        type="button"
        onClick={() => handleClick('/admin')}
        variant="contained"
      >
        Admin
      </Button>
      <br />
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
