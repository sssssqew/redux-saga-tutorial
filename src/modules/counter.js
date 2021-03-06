import { createAction, handleActions } from "redux-actions";
import { delay, put, takeEvery, takeLatest, select, throttle } from 'redux-saga/effects'

const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC'
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC'

export const increase = createAction(INCREASE)
export const decrease = createAction(DECREASE)

export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined) // 외부에서 INCREASE_ASYNC 액션을 생성해서 디스패치함
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined) // 외부에서 DECREASE_ASYNC 액션을 생성해서 디스패치함

function* increaseSaga(){
  yield delay(1000)
  yield put(increase())
  const number = yield select(state => state.counter)
  console.log(`현재 값은 ${number} 입니다.`)
}
function* decreaseSaga(){
  yield delay(1000)
  yield put(decrease())
}

export function* counterSaga(){
  yield throttle(3000, INCREASE_ASYNC, increaseSaga) // throttle: 3초동안 여러개의 액션이 발생한 경우 한번만 처리함
  // yield takeEvery(INCREASE_ASYNC, increaseSaga) // takeEvery: 여러개의 액션이 발생한 경우 모두 처리함
  yield takeLatest(DECREASE_ASYNC, decreaseSaga) // takeLatest: 여러개의 액션이 발생한 경우 마지막 액션만 처리함
}

const initialState = 0

const counter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1
  },
  initialState
)

export default counter


