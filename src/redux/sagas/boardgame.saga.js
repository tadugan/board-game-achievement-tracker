import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAllBoardgames() {
    console.log('We got into getAllBoardgames'); // test
    try {
        const allBoardgames = yield axios.get('/boardgame');
        yield put({ type: 'SET_ALL_BOARDGAMES', payload: allBoardgames.data })
    } catch (error) {
        console.log('Error GETTING all board games. Error:', error);
    }
}

function* boardgameSaga() {
    yield takeLatest('GET_ALL_BOARDGAMES', getAllBoardgames);
}

export default boardgameSaga;