import Immutable from 'immutable';

const initialState = Immutable.Map({ 
  header: 'Sailing Screen' 
});

const actionsMap = {
  action(state /*, action*/) {
    return state.update('header', n => {
        return 'Action'
    });
  }
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
