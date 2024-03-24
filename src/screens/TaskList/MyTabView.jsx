import { useState } from 'react';
import { useTheme, Badge } from 'react-native-paper';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TaskList from './TaskList';


export default MyTabView = ({ navigation, route }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const theme = useTheme();

  const [routes] = useState([
    { key: 'first', title: 'UserName' },
    { key: 'second', title: 'Общие' },
  ]);

  const FirstRoute = () => (
    <TaskList navigation={navigation} route={route} />
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }} />
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
      renderBadge={() => <Badge>3</Badge> }
      // getLabelText={({ route }) => route.title}
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


