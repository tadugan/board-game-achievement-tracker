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

function* achievementSaga() {
    yield takeLatest('GET_PROFILE_ACHIEVEMENTS', getProfileAchievements);
}