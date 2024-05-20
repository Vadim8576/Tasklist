import { useEffect, useLayoutEffect, useState } from "react";
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

export default TabNavigator = observer(({navigation, setScreenTitle}) => {


  const TITLE = {
    TaskList: 'Мои задачи',
    GroupTaskList: 'Групповые задачи',
    FavoriteUsers: 'Избранные пользователи',
    Setting: 'Настройки',
  }



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
    const unsubscribe1 = appStore.subscribeToTaskList({userId, collectionId: 'list'})
    return unsubscribe1
  }, [userId])


  useEffect(() => {
    if (!userId) return
    const unsubscribe2 = appStore.subscribeToTaskList({userId, collectionId: 'grouplist'})
    return unsubscribe2
  }, [userId])


  useEffect(() => {
    if (!userId) return
    authStore.setUser(user)
  }, [userId])




  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false
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

              setScreenTitle(TITLE[route.name])

              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });

            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 28 });
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
          labeled={false}
        />
      )}
    >


      <Tab.Screen
        name='TaskList'
        component={TaskList}
        options={{
          // tabBarLabel: TITLE['TaskList'],
          tabBarIcon: ({ color, size }) => {
            return <Icon name="playlist-check" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name='GroupTaskList'
        component={TaskList}
       
        options={{
          // tabBarLabel: TITLE['GroupTaskList'],
          tabBarIcon: ({ color, size }) => {
            return <Icon name="playlist-star" size={size} color={color} />;
          },
        }}
      />
        
      <Tab.Screen
        name='FavoriteUsers'
        component={FavoriteUsers}
        options={{
          tabBarLabel: TITLE['FavoriteUsers'],
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account-star" size={size} color={color} />;
          },
        }}
      />
       
      <Tab.Screen
        name='Setting'
        options={{
          // tabBarLabel: TITLE['Setting'],
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