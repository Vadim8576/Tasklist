import { observer } from "mobx-react-lite";
import { View, StyleSheet } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen, Text, BottomNavigation, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TaskList from './screens/TaskList/TaskList';
import { useAuth } from "./hooks/useAuth";
import { useEffect, useState } from "react";
import appStore from "./store/appStore";
import authStore from "./store/authStore";
import FavoriteUsers from "./screens/FavoriteUsers/FavoriteUsers";



const Tab = createBottomTabNavigator();

export default TabNavigator = observer(() => {

  const [numberOfTasks, setNumberOfTasks] = useState(0)
  const [numberOfGorupTasks, setNumberOfGroupTasks] = useState(0)

  const { user } = useAuth()
  const userId = user.uid

  const theme = useTheme()

  const taskList = appStore.taskList



  // useEffect(() => {
  //   setNumberOfTasks(taskListLength)
  // }, [taskListLength])

  // useEffect(() => {
  //   setNumberOfGroupTasks(groupTaskListLength)
  // }, [groupTaskListLength])


  

  useEffect(() => {
    if (!userId) return

    const unsubscribe = appStore.subscribeToTasks(userId)

    return unsubscribe
  }, [userId])


  useEffect(() => {
    if (!userId) return
    authStore.setUser(user)
  }, [userId])



  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          // shifting={true}
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
              return options.tabBarIcon({ focused, color, size: 24 });
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
      {/* <Tab.Screen
        name="Main"
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      >
        {(props) => (
          <TaskList
            {...props}
            taskList={taskList}
          />
        )}  
      </Tab.Screen> */}
      <Tab.Screen
        name="TaskList"
        options={{
          tabBarLabel: 'Мои задачи',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="format-list-bulleted" size={size} color={color} />;
            // return <Icon name="home" size={size} color={color} />;
          },
        }}
      >
        {(props) => (
          <TaskList
            {...props}
            taskList={taskList}
          />
        )}  
      </Tab.Screen>
      <Tab.Screen
        name="GroupTaskList"
        options={{
          tabBarLabel: 'Групповые задачи',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="format-list-bulleted" size={size} color={color} />;
            // return <Icon name="cog" size={size} color={color} />;
          },
        }}
      >
        {(props) => (
          <TaskList
            {...props}
            taskList={taskList}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="FavoriteUsers"
        options={{
          tabBarLabel: 'Мои друзья',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account-multiple" size={size} color={color} />;
          },
        }}
      >
        {(props) => (
          <FavoriteUsers
            {...props}
          />
        )}
      </Tab.Screen>
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