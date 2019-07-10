import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl, Image } from 'react-native';

import { Container, ContainerHeader, ContainerSun, TextWelcome, IconRight, ContainerIcon, TextSecond, TextThree, Task, Card } from './styles';
import ActionButton from 'react-native-action-button';

import right from '../../assets/right-arrow.png'
import sol from '../../assets/sun-2026715_960_720.png'



export default class Main extends Component {

  static navigationOptions = {
    header: null,  
  }

  constructor() {
    super()

    this.state = {
      todos: [],
      _id: 0,
      refreshing: true,
    
    }
  }

  componentDidMount() {
    this.handleRefresh()
  }

  handleRefresh = async () => {

    try {
      const response = await fetch('http://localhost:3001/api/all');
      const todo = await response.json();
      this.setState({ todos: todo.todos, refreshing: false });
      console.log(todo)
  } catch(err) {
      console.log("Error fetching data-----------", err);
  }

  }


  render() { 
    return(
      <Container>
        <ContainerHeader>
        <ContainerSun>
        <Image source={sol} style={{ height: 250, width: 250, paddingBottom: 100 }} />
        </ContainerSun>
        <TextWelcome>BOM DIA!</TextWelcome>
        <TextSecond>Hoje o dia está</TextSecond>
        <TextThree>Ensolarado 23°</TextThree>

        </ContainerHeader>
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        }
        >
        <FlatList
          data={this.state.todos}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            return (
              <Card onPress={() => this.props.navigation.navigate('EditTodoScreen', {item: item }, console.log(item) )}>
                <Task>{item.task} </Task>
                <ContainerIcon style={{ flex: 1, alignItems: 'flex-end', marginRight: 15 }}>
                <IconRight source={right} />
                </ContainerIcon>
              </Card>
            );
          }}
        />
        </ScrollView>


        <ActionButton
        position="center"
        buttonColor="#E23A60"
        onPress={() => this.props.navigation.navigate('AddTodoScreen')}
      />
      </Container>
    );
  }
}
