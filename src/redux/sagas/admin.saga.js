import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addNewGame(action) {
    try {
        yield axios.post('/admin/boardgame', action.payload )
    } catch (error) {
        console.log('Error adding new game. Error:', error);
    }
}

function* adminSaga() {
    yield takeLatest('ADMIN_ADD_NEW_GAME', addNewGame);
}

export default adminSaga;