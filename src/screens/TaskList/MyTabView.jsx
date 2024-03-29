import { useEffect, useState } from 'react';
import { useTheme, Badge } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import TaskList from './TaskList';
import { tabType } from '../../const/constants';
import { useListFilter } from '../../hooks/useListFilter';
import { observer } from "mobx-react-lite";
import appStore from '../../store/appStore';
import { useAuth } from '../../hooks/useAuth';
import authStore from '../../store/authStore';




export default MyTabView = observer(({ navigation, route }) => {
  const { user } = useAuth()
  const userId = user.uid
  const [routes] = useState([
    { key: tabType.taskList, title: 'UserName' },
    { key: tabType.groupTaskList, title: 'Групповые' },
  ]);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [numberOfTasks, setNumberOfTasks] = useState(0)
  const [numberOfGorupTasks, setNumberOfGroupTasks] = useState(0)
  const [currentListType, setCurrentList] = useState(routes[0].key)
  const theme = useTheme()

  const taskList = appStore.taskList
  const list = useListFilter(taskList, currentListType)

  const taskListLength = useListFilter(taskList, tabType.taskList)?.length
  const groupTaskListLength = useListFilter(taskList, tabType.groupTaskList)?.length



  useEffect(() => {
    setNumberOfTasks(taskListLength)
  }, [taskListLength])

  useEffect(() => {
    setNumberOfGroupTasks(groupTaskListLength)
  }, [groupTaskListLength])


  useEffect(() => {
    setCurrentList(routes[index].key)
  }, [index])



  useEffect(() => {
    if(currentListType === tabType.groupTaskList) return
    if (!userId) return
    
    const unsubscribe = appStore.subscribeToTasks(userId)

    return unsubscribe
  }, [userId])


  useEffect(() => {
    if(currentListType === tabType.groupTaskList) return
    if(!userId) return
    authStore.setUser(user)
  }, [userId])




  // попробовать добавить ключи к ListItem, чтобы не отображались страрые данные

  const renderScene = ({ route }) => {
    switch (route.key) {
      case tabType.taskList:
        return (
          <TaskList
            key={tabType.taskList}
            navigation={navigation}
            route={route}
            list={list}
          />
        )
      case tabType.groupTaskList:
        return (
          <TaskList
            key={tabType.groupTaskList}
            navigation={navigation}
            route={route}
            list={list}
          />
        )
      default:
        return null;
    }
  };
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: theme.colors.primary }}
      renderBadge={
        ({ route }) => route.key === tabType.taskList
          ? <Badge>{numberOfTasks}</Badge>
          : <Badge>{numberOfGorupTasks}</Badge>
      }
    />
  );

  return (
    <TabView
      // lazy={({ route }) => route.key === tabType.groupTaskList}
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
})


