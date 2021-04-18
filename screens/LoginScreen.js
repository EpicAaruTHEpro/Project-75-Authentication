import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Alert,
    StyleSheet,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from "firebase";

export default class LoginScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            emailID: "",
            password: ""
        }
    }

    login = async(email,password) => {
        if (email && password) {
            try{
                const response = firebase.auth().signInWithEmailAndPassword(email, password);
                if(response){
                    this.props.navigation.navigate('Write')
                }
            }catch(error){
                switch(error.code) {
                    case "auth/user-not-found": Alert.alert("User doesn't exist");
                    break;
                    case "auth/invalid-email": Alert.alert("Incorrect Details Entered");
                    break;
                }
            } 
        }

        else {
            Alert.alert("Please enter the email and password");
        }
    }

    render() {
        return(
            <KeyboardAvoidingView style = {{alignItems: "center", marginTop: 20}}>
            <View>
                <Image source = {require("../assets/readingbook.png")} style = {{width: 200, height: 200}}/>
                <Text style={{textAlign: "center", fontSize: 30}}> Bed Time Stories </Text>
            </View>
            <View>
            <TextInput
            style= {styles.loginBox}
            placeholder = "Email ID"
            onChangeText = {text => {
                this.setState({emailID: text})
              }}
            keyboardType = "email-address"/>
            <TextInput
            style= {styles.loginBox}
            placeholder = "Password"
            onChangeText = {text => {
                this.setState({password: text})
              }}
            secureTextEntry = {true}/>
            </View>
            <View>
            <TouchableOpacity style = {styles.button} onPress= {() => {this.login(this.state.emailID, this.state.password)}}> 
            <Text style = {{textAlign: "center"}}> Login </Text>
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    loginBox:
    {
      width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin:10,
    paddingLeft:10
    },
    button:{
        height:30,
        width:90,
        borderWidth:1,
        marginTop:20,
        paddingTop:5,
        borderRadius:7
    }
  })