import Immutable from 'immutable';

const initialState = Immutable.Map({ 
  header: 'Sailing Screen' 
});

const actionsMap = {
  alert(state /*, action*/) {
    console.log('dispatched')
    return state.update('header', () => {
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
