import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, TransitionSpecs } from '@react-navigation/native-stack';
import Home from './Components/Home';
import Login from './Components/Login';
import AddEmployee from './Components/AddEmployee'
import ViewAttendSearch from './Components/ViewAttendSearch';
import Employees from './Components/Employees';
import Salary from './Components/Salary';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
            name="Login"
            component={Login} 
            options = {{
            headerShown: false,
          }}/>
        <Stack.Screen 
            name="Home"
            component={Home}
            options = {{
              headerShown: false,
              animation:'slide_from_right',
          }}/>
          <Stack.Screen 
            name="AddEmployee"
            component={AddEmployee}
            options = {{
              title: 'Add new employee',
              animation:'slide_from_right',
          }}/>
          <Stack.Screen 
            name="ViewAttendSearch"
            component={ViewAttendSearch}
            options = {{
              title: 'View Attendance',
              animation:'slide_from_right',
          }}/>
          <Stack.Screen 
            name="Employees"
            component={Employees}
            options = {{
              title: 'Employee list',
              animation:'slide_from_right',
          }}/>
          <Stack.Screen 
            name="Salary"
            component={Salary}
            options = {{
              title: 'Calculate Salary',
              animation:'slide_from_right',
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
