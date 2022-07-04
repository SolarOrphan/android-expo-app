import React from "react-native";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./screens/Dashboard";
import ViewCollection from "./screens/ViewCollection";
import ViewItem from "./screens/ViewItem";
import CreateAccount from "./screens/CreateAccount";
import AddCollection from "./components/AddCollection";
import Camera from "./screens/Camera";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: 'Dashboard' }}
        /> */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="ViewCollection" component={ViewCollection} />
        <Stack.Screen name="ViewItem" component={ViewItem} />
        {/* <Stack.Screen name="AddCollection" component={AddCollection} /> */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Camera" component={Camera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
