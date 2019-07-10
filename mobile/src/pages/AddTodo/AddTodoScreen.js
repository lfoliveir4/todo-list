import React, { Component } from 'react';
import {  SafeAreaView, StyleSheet } from 'react-native';


import { Container, TextTitle, CancelIcon, Exit, TextAddOne, Input, TextAddTwo, TextAddThree, Add, TextAdd } from './styles'

import cancel from '../../assets/cancel.png'




export default class AddTodoScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <CancelIcon style={{ marginRight: 20 }} onPress={() => navigation.navigate('MainScreen')}>
        <Exit source={cancel} />
      </CancelIcon>
    ),
    headerTitle: (
      <TextTitle>Nova Tarefa</TextTitle>
    ),
    headerLeft: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      task: '',
      hour: '',
      priority: '',
      done: false,
    };
  }

  handleSubmit = async () => {

      await fetch('http://localhost:3001/api/add', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: this.state.task,
        hour: this.state.hour,
        priority: this.state.priority,
        done: this.state.done,
      })
    })

    this.props.navigation.navigate('MainScreen')

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, margin: 0, backgroundColor: '#FFFFFF'  }}>
      <Container>
        <TextAddOne> O que esta pensando em fazer hoje? </TextAddOne>
        <Input
        autoCorrect={false}
        autoCapitalize="none"
        value={this.state.task}
        onChangeText={task => this.setState({ task })}
        style={styles.textInput}
        
        />

        <TextAddTwo> Que horas? </TextAddTwo>
        <Input
        autoCorrect={false}
        autoCapitalize="none"
        value={this.state.hour}
        onChangeText={hour => this.setState({ hour })}
        style={styles.textInput}
        
        
        />

        <TextAddThree> Qual a prioridade? </TextAddThree>
        <Input
        autoCorrect={false}
        autoCapitalize="none"
        value={this.state.priority}
        onChangeText={priority => this.setState({ priority })}
        style={styles.textInput}
           
        />

        <Add
        onPress={this.handleSubmit}
        >
          <TextAdd>Adicionar</TextAdd>
        </Add>
      </Container>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  textInput: {
    fontSize: 35,
    color: '#E23A60',
    fontWeight: 'bold'

  }

})
