import { createStackNavigator } from "@react-navigation/stack";
import PhotoScreen from "../screens/PhotoScreen";
const Stack = createStackNavigator();

export default HiddenStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PhotoScreen" component={PhotoScreen} />
    </Stack.Navigator>
  );
};
