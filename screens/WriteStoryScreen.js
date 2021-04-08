import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import AppHeader from "../components/AppHeader";
import { TextInput } from 'react-native-gesture-handler';
import db from "../config";
import firebase from "firebase";
  
export default class WriteScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      story: ""
    }
  }

  submitStory = async() => {
    console.log(this.state.title);
    db.collection("stories").add({
        title: this.state.title,
        author: this.state.author,
        story: this.state.story
      })
    Alert.alert("story submitted");
    ToastAndroid.show("Story Submitted", ToastAndroid.LONG)
    this.setState({
      title: "",
      author: "",
      story: ""
    })
  }


  render() {
          return(
            <KeyboardAvoidingView behavior = "padding" enabled>
            <AppHeader/>
          <View style = {styles.container}>
              <TextInput
              style = {styles.inputBox}
              placeholder = "Story Title"
              onChangeText = {text => {
                this.setState({title: text})
              }}
              value = {this.state.title}/>
              <TextInput
              style = {styles.inputBox}
              placeholder = "Author"
              onChangeText = {text => {
                this.setState({author: text})
              }}
              value = {this.state.author}/>
              <TextInput
              style = {{width: 300,
                      height: 300,
                      borderWidth: 2,
                      fontSize: 20,
                      margin: 10}}
              placeholder = "Write your Story"
              onChangeText = {text => {
                this.setState({story: text})
              }}
              multiline = {true}
              value = {this.state.story}/>
              <TouchableOpacity
                  onPress = {this.submitStory}
                  style = {styles.submitButton}>
                    <Text style = {styles.submitButtonText}> Submit </Text> 
                  </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputBox:{
      width: 300,
      height: 40,
      borderWidth: 2,
      fontSize: 20,
      margin: 10,
      
    },
    submitButton:{
      backgroundColor: 'pink',
      width: 100,
      height:50,
      justifyContent: "center"
    },
    submitButtonText:{
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight:"bold",
      color: 'white'
    }
  });