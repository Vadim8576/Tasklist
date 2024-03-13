import { Appbar, useTheme } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { Menu } from 'react-native-paper';
import { useState } from 'react';

export default NavigationAppBar = ({ navigation, route, options, back }) => {

  const theme = useTheme();

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header
      style={{ backgroundColor: theme.colors.primary }}
    >
      {back ? <Appbar.BackAction color={theme.colors.onPrimary} onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={title}
        color={theme.colors.onPrimary}
      />
      {back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              color={theme.colors.onPrimary}
              icon="dots-vertical"
              onPress={openMenu}
            />
          }>
          <Menu.Item
            onPress={() => {
              console.log('Option 1 was pressed');
            }}
            title="Option 1"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 2 was pressed');
            }}
            title="Option 2"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 3 was pressed');
            }}
            title="Option 3"
            disabled
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}