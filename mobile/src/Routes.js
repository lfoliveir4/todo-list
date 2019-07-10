import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation';



import MainScreen from './pages/Main/MainScreen'
import EditTodoScreen from './pages/EditTodo/EditTodoScreen'
import AddTodoScreen from './pages/AddTodo/AddTodoScreen'


export default createAppContainer(
    createStackNavigator({
        MainScreen,
        AddTodoScreen,
        EditTodoScreen,
        
    },
    
    )
)