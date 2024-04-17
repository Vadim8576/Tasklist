import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from "../hooks/useAuth";
import appStore from "../store/appStore";
import authStore from "../store/authStore";
import TaskList from '../screens/TaskList/TaskList';
import FavoriteUsers from "../screens/FavoriteUsers/FavoriteUsers";



const Tab = createBottomTabNavigator();

export default TabNavigator = observer(() => {

  const [numberOfTasks, setNumberOfTasks] = useState(0)
  const [numberOfGorupTasks, setNumberOfGroupTasks] = useState(0)

  const { user } = useAuth()
  const userId = user.uid

  const theme = useTheme()

 

  // console.log('props tabNav = ', props)

  // useEffect(() => {
  //   setNumberOfTasks(taskListLength)
  // }, [taskListLength])

  // useEffect(() => {
  //   setNumberOfGroupTasks(groupTaskListLength)
  // }, [groupTaskListLength])




  useEffect(() => {
    if (!userId) return
    const unsubscribe = appStore.subscribeToTaskList(userId)
    return unsubscribe
  }, [userId])


  useEffect(() => {
    if (!userId) return
    authStore.setUser(user)
  }, [userId])


  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
      })}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          // getBadge={(props) => {
          //   return props.route.name === 'TaskList' ? '1' : ''
          // }}
          
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });

            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 22 });
            }
            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.title;
            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="TaskList"
        component={TaskList}
        options={{
          tabBarLabel: 'Мои задачи',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="format-list-bulleted" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="GroupTaskList"
        component={TaskList}
        options={{
          tabBarLabel: 'Групповые задачи',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="format-list-bulleted" size={size} color={color} />;
          },
        }}
      />
        
      <Tab.Screen
        name="FavoriteUsers"
        component={FavoriteUsers}
        options={{
          tabBarLabel: 'Мои друзья',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account-multiple" size={size} color={color} />;
          },
        }}
      />
       
      <Tab.Screen
        name="Setting"
        options={{
          tabBarLabel: 'Настройки',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      >
        {(props) => null}
      </Tab.Screen>
    </Tab.Navigator>
  );
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})