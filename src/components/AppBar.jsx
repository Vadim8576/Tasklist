import { useState } from 'react'
import { Appbar, useTheme, Menu, Text } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { dateConversion } from '../helpers/dateСonversion';
import appStore from '../store/appStore';



export default AppBar = ({ navigation, route, options, back }) => {

  const theme = useTheme();

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const title = route.name === 'TabNavigator' ? '' : getHeaderTitle(options, route.name);
  const description = options?.description || ''
  

  const removeAllTaskList = () => {
    appStore.removeAllTaskList()
    closeMenu()
  }

  // console.log('BAR route = ', route)
  // console.log('BAR back = ', back)


  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
      {back ? <Appbar.BackAction
        color={theme.colors.onPrimary}
        onPress={navigation.goBack} />
        : null}
      <Appbar.Content
        title={
          <>
            <Text
              style={{ color: theme.colors.surface, fontSize: 16 }}
            >
              {title || ''}
            </Text>
            {description &&
              <Text
                style={{ color: theme.colors.secondaryContainer, fontSize: 10 }}
              >
                {dateConversion(description)}
              </Text>
            }
          </>
        }
      />
      {options?.onSubmitButton &&
        <Appbar.Action
          size={28}
          color={theme.colors.surface}
          icon="check"
          onPress={options?.onSubmitHandler}
        />
      }
      {back && !options?.onSubmitHandler ? (
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
            // onPress={appStore.deleteAllDocuments}
            onPress={removeAllTaskList}
            title="Удалить все"
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