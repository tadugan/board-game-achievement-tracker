import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addToCollection(action) {
    try {
        yield axios.post('/collection', action.payload);
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

function* collectionSaga() {
    yield takeLatest('ADD_TO_COLLECTION', addToCollection);
    yield takeLatest('GET_USER_COLLECTION', getUserCollection);
}

export default collectionSaga;