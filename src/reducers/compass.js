import Immutable from 'immutable';

const initialState = Immutable.Map({ 
  direction: 0
});

const actionsMap = {
  newDirection(state /*, action*/) {
    console.log('receive Redux action')
    return state.update('direction', () => {
        return 'Changed Header' 
    });
  }
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  console.log('reduce fn alert',reduceFn)
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
