import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addNewGame(action) {
    try {
        yield axios.post('/admin/boardgame', action.payload )
    } catch (error) {
        console.log('Error adding new game. Error:', error);
    }
}

function* addNewAchievement(action) {
    try {
        console.log('action.payload', action.payload); // test
        yield axios.post('/admin/achievement', action.payload);
    } catch (error) {
        console.log('Error adding new achievement. Error:', error);
    }
}

function* adminSaga() {
    yield takeLatest('ADMIN_ADD_NEW_GAME', addNewGame);
    yield takeLatest('ADMIN_ADD_NEW_ACHIEVEMENT', addNewAchievement);
}

export default adminSaga;