import { takeEvery, call, put } from 'redux-saga/effects'
import ShopActionTypes from './shop.types'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { fetchCollectionsSucccess, fetchCollectionsFailure } from "./shop.actions";

// generally a function that does the asynchronous code
// that we wanted to do.
export function* fetchCollectionsAsync() {
  yield console.log('I am fired')

  try {
    const collectionRef = firestore.collection('collections')
    // similar to async await
    const snapshot = yield collectionRef.get()
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSucccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
    // dispatch(fetchCollectionsStart())

    // collectionRef
    //   .get()
    //   .then((snapshot) => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //     //   updateCollections(collectionsMap)
    //     this.setState({ loading: false })
    //   })
    //   .catch((error) => dispatch(fetchCollectionsFailure(error.message)))
}

export function* fetchCollectionsStart() {
  yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}
