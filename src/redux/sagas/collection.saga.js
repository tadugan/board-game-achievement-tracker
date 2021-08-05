import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addToCollection(action) {
    try {
        yield axios.post('/collection', action.payload);
    } catch (error) {
        console.log('Error adding game to collection. Error:', error);
    }
}


function* collectionSaga() {
    yield takeLatest('ADD_TO_COLLECTION', addToCollection);
}

export default collectionSaga;