import { useState } from 'react';
import { useTheme, Badge } from 'react-native-paper';
import { Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TaskList from './TaskList';
import GroupTaskList from '../GroupTaskList/GroupTaskList';



const tabName = {
  taskList: 'TASK_LIST',
  groupTaskList: 'GROUP_TASK_LIST'
}


export default MyTabView = ({ navigation, route }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [numberOfTasks, setNumberOfTasks] = useState(0)
  const [numberOfGorupTasks, setNumberOfGroupTasks] = useState(0)


  const theme = useTheme();

  const [routes] = useState([
    { key: tabName.taskList, title: 'UserName' },
    { key: tabName.groupTaskList, title: 'Групповые' },
  ]);



  const renderScene = ({ route }) => {
    switch (route.key) {
      case tabName.taskList:
        return (
          <TaskList
            navigation={navigation}
            route={route}
            setNumberOfTasks={setNumberOfTasks}
          />
        )
      case tabName.groupTaskList:
        return (
          <GroupTaskList
            navigation={navigation}
            route={route}
            setNumberOfGroupTasks={setNumberOfGroupTasks}
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
        ({ route }) => route.key === tabName.taskList
          ? <Badge>{numberOfTasks}</Badge>
          : <Badge>{numberOfGorupTasks}</Badge>
      }
    />
  );

  return (
    <TabView
      // lazy={({ route }) => route.key === 'second'}
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}


