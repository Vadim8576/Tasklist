import { useState } from 'react';
import { useTheme, Badge } from 'react-native-paper';
import { Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TaskList from './TaskList';
import GroupTaskList from '../GroupTaskList/GroupTaskList';


export default MyTabView = ({ navigation, route }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [numberOfTasks, setNumberOfTasks] = useState(0)
  const [numberOfGorupTasks, setNumberOfGroupTasks] = useState(0)

  const theme = useTheme();

  const [routes] = useState([
    { key: 'first', title: 'UserName' },
    { key: 'second', title: 'Групповые' },
  ]);

  const FirstRoute = () => (
    <TaskList
      navigation={navigation}
      route={route}
      setNumberOfTasks={setNumberOfTasks}
      index={index}
    />
  );

  const SecondRoute = () => (
    <GroupTaskList
      navigation={navigation}
      route={route}
      setNumberOfGroupTasks={setNumberOfGroupTasks}
      index={index}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: theme.colors.primary }}
      renderBadge={
        ({ route }) => route.key === 'first'
        ? <Badge>{numberOfTasks}</Badge>
        : <Badge>{numberOfGorupTasks}</Badge>
      }
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}


