import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, } from 'react-native';
import { Container, TextTitle, CancelIcon, Exit, TextAddOne, Input, TextAddTwo, TextAddThree, Add, TextAdd, DeleteItem, TextDelete, ContainerDelete } from './styles'

import cancel from '../../assets/cancel.png'

export default class EditTodo extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <CancelIcon style={{ marginRight: 20 }} onPress={() => navigation.navigate('MainScreen')}>
        <Exit source={cancel} />
      </CancelIcon>
    ),
    headerTitle: (
      <TextTitle>Editar Tarefa</TextTitle>
    ),
    headerLeft: null,
  });


  constructor(props) {
    super(props);
  
    this.state = this.props.navigation.state.params.item
  
  }

  handleUpdate = (id) => {

    fetch(`http://localhost:3001/api/update/${this.state._id}`, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: 'PUT',
    body: JSON.stringify({
        task: this.state.task,
        hour: this.state.hour,
        priority: this.state.priority,
        done: this.state.done,
    })
  })
  .then(() => {
    this.props.navigation.navigate('MainScreen')
  })
  }

  handleDelete = () => {
    fetch(`http://localhost:3001/api/delete/${this.state._id}`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'DELETE'
    }).then(() => {
      this.props.navigation.navigate('MainScreen')
    }).catch(err => {
      console.error(err)
    });

  }


  render() {
   
    return(
      <SafeAreaView style={{ flex: 1, margin: 0, backgroundColor: '#FFFFFF'  }}>
      <Container>
      <TextAddOne> O que esta pensando em fazer hoje? </TextAddOne>
          <Input
            value={this.state.task}
            style={styles.textInput}
            onChangeText={task => this.setState({ task })}
          />

          <TextAddTwo> Que horas? </TextAddTwo>
          <Input
            value={this.state.hour}
            style={styles.textInput}
            onChangeText={hour => this.setState({ hour })}
          />

          <TextAddThree> Qual a prioridade? </TextAddThree>
          <Input
            value={this.state.priority}
            style={styles.textInput}
            onChangeText={priority => this.setState({ priority })}
          />

        <ContainerDelete>
        <DeleteItem onPress={this.handleDelete}>
          <TextDelete>Apagar tarefa</TextDelete>
        </DeleteItem>
        <Add
        onPress={this.handleUpdate}
        >
          <TextAdd>Salvar</TextAdd>
        </Add>
        </ContainerDelete>
      </Container>
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  textInput: {
    fontSize: 35,
    color: '#E23A60',
    fontWeight: 'bold'

  }

})

