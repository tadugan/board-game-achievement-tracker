import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addToCollection(action) {
    const gameId = action.payload; 
    console.log('gameId:', gameId);
    try {
        yield axios.post('/collection', action.payload);
        yield put({ type: 'GET_USER_COLLECTION' });
        yield put({ type: 'GET_USER_ACHIEVEMENTS', payload: gameId });
        console.log('this is action.payload:', action.payload);
        action.payload.history.push(`/collection/${gameId.id}`);
    } catch (error) {
        console.log('Error adding game to collection. Error:', error);
    }
}

function* getUserCollection() {
    try {
        const myCollection = yield axios.get('/collection');
        yield put({ type: 'SET_ALL_BOARDGAMES', payload: myCollection.data })
    } catch (error) {
        console.log('Error getting user collection. Error:', error);
    }
}

function* removeFromCollection(action) {
    const gameId = action.payload;
    try {
        yield axios.delete(`/collection/${gameId.id}`);
        yield put({ type: 'GET_USER_COLLECTION' });
        action.payload.history.push('/collection');
    } catch (error) {
        console.log('Error removing game from user collection. Error:', error);
    }
}

function* collectionSaga() {
    yield takeLatest('ADD_TO_COLLECTION', addToCollection);
    yield takeLatest('GET_USER_COLLECTION', getUserCollection);
    yield takeLatest('REMOVE_FROM_COLLECTION', removeFromCollection);
}

export default collectionSaga;