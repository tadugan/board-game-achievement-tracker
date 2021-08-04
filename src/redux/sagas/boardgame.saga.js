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

function* getGameDetails(action) {
    const gameId = action.payload.id;
    try {
        const gameDetails = yield axios.get(`/boardgame/${gameId}`);
        yield put({ type: 'SET_GAME_DETAILS', payload: gameDetails.data});
    } catch (error) {
        console.log('Error GETTING Board Game details. Error:', error);
    }
}

function* boardgameSaga() {
    yield takeLatest('GET_ALL_BOARDGAMES', getAllBoardgames);
    yield takeLatest('GET_GAME_DETAILS', getGameDetails);
}

export default boardgameSaga;