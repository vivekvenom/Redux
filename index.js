const redux = require("redux");
const createStore = redux.createStore;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";
const bind = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function reStock(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function reStockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

const initialStateCake = {
  numOfCakes: 10,
};

const initialStateIceCream = {
  numOfIceCream: 20,
};

const CakeReducer = (state = initialStateCake, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialStateIceCream, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: CakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, redux.applyMiddleware(logger));
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(reStock(3));

const action = bind(
  { orderCake, reStock, orderIceCream, reStockIceCream },
  store.dispatch
);
action.orderCake();
action.orderCake();
action.orderCake();
action.reStock(3);
action.orderIceCream();
action.orderIceCream();
action.orderIceCream();
action.reStockIceCream(3);

unsubscribe();
