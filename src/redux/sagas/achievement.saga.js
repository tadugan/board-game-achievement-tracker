import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getProfileAchievements() {
    try {
        const profileAchievements = yield axios.get('/achievement/profile');
        yield put({ type: 'SET_PROFILE_ACHIEVEMENTS', payload: profileAchievements.data })
    } catch (error) {
        console.log('Error GETTING profile achievements. Error:', error);
    }
}

function* getGameAchievements(action) {
    const gameId = action.payload.id;
    try {
        const gameAchievements = yield axios.get(`/achievement/${gameId}`);
        yield put({ type: 'SET_GAME_ACHIEVEMENTS', payload: gameAchievements.data })
    } catch (error) {
        console.log('Error GETTING profile achievements. Error:', error);
    }
}

function* getUserAchievements(action) {
    const gameId = action.payload.id;
    try {
        const userAchievements = yield axios.get(`/achievement/user/${gameId}`);
        yield put({ type: 'SET_USER_ACHIEVEMENTS', payload: userAchievements.data })
    } catch (error) {
        console.log('Error GETTING user achievements for one game. Error:', error);
    }
}

function* markAchievementComplete(action) {
    const achievementId = action.payload.achievementId;
    const gameId = action.payload.boardgameId;
    try {
        yield axios.post(`/achievement/user/complete/${achievementId}`);
        yield put({ type: 'GET_USER_ACHIEVEMENTS', payload: { id: gameId }});
    } catch (error) {
        console.log('Error marking user achievement as complete. Error:', error);
    }
}

function* achievementSaga() {
    yield takeLatest('GET_PROFILE_ACHIEVEMENTS', getProfileAchievements);
    yield takeLatest('GET_GAME_ACHIEVEMENTS', getGameAchievements);
    yield takeLatest('GET_USER_ACHIEVEMENTS', getUserAchievements);
    yield takeLatest('MARK_ACHIEVEMENT_COMPLETE', markAchievementComplete);
}

export default achievementSaga;