/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faUsers,
  faPeopleGroup,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import OverviewScreen from './src/screens/OverviewScreen';

const Tab = createBottomTabNavigator();

// Temporary placeholder components
const GroupsScreen = () => null;
const TeamScreen = () => null;
const SettingsScreen = () => null;

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({color, size}) => {
                let icon;

                switch (route.name) {
                  case 'Overview':
                    icon = faHome;
                    break;
                  case 'Groups':
                    icon = faUsers;
                    break;
                  case 'Team':
                    icon = faPeopleGroup;
                    break;
                  case 'Settings':
                    icon = faCog;
                    break;
                  default:
                    icon = faHome;
                }

                return <FontAwesomeIcon icon={icon} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#4B50E9',
              tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen
              options={{
                headerShown: false,
              }}
              name="Overview"
              component={OverviewScreen}
            />
            <Tab.Screen name="Groups" component={GroupsScreen} />
            <Tab.Screen name="Team" component={TeamScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
