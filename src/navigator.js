import { StackNavigator } from 'react-navigation';

import Home from './containers/Home';
import Counter from './containers/Counter';
import Sailing from './containers/Sailing';

const AppNavigator = new StackNavigator(
  {
    Home: { screen: Home },
    Counter: { screen: Counter },
    Sailing: { screen: Sailing }
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      header: null,
    },
  },
);

export default AppNavigator;
