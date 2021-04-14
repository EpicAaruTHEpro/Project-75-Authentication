import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';
import AppHeader from "../components/AppHeader";
import { TextInput } from 'react-native-gesture-handler';
import db from "../config";
import firebase from "firebase";
  
  export default class ReadScreen extends React.Component {

      constructor() {
        super();
        this.state = {
          query: "",
          allStories: [],
          lastVisibleStory: null
        }
      }

      componentDidMount = async() => {
        const search = await db.collection("stories").limit(10).get()
        search.docs.map((doc)=>{
          this.setState({
            allStories: [],
            lastVisibleStory: doc
          })
        })
      }

      retriveStories = async(text) => {
        //var enteredText = text.split("")  
        //console.log(enteredText);
          console.log("hello");
          const stories =  await db.collection("stories").where('title','==',text).get()
          console.log(stories);
          stories.docs.map((doc)=>{
            this.setState({
              allStories:[...this.state.allStories,doc.data()],
              lastVisibleStory: doc
            })
            console.log(doc);
          })
      }

      getMoreStories = async() => {
        var text = this.state.query
        //var enteredText = text.split("")

        
        //if (enteredText[0].toUpperCase() ==='B'){
        const search = await db.collection("stories").where('title','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
        search.docs.map((doc)=>{
          this.setState({
            allStories: [...this.state.allStories, doc.data()],
            lastVisibleStory: doc
          })
        })
      //}
        //else if(enteredText[0].toUpperCase() === 'S'){
          
        //}
      }

      render() {
          return(
          <View style= {styles.container}>
          <AppHeader/>
          <TextInput 
          style= {styles.searchBar}
          placeholder = "Type Here ..."
          onChangeText={text => {
            this.setState({query: text, lastVisibleStory: null, allStories: []})
          }}
          value={this.state.query}
          />
          <TouchableOpacity style = {styles.searchButton}
          onPress = {()=>{this.retriveStories(this.state.query)
            this.setState({lastVisibleStory: null, allStories: []})}}>
          <Text> Search </Text>
          </TouchableOpacity>
          <FlatList
          data={this.state.allStories}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2, padding: 10}}>
              <Text>{"Title: " + item.title}</Text>
              <Text>{"Author: " + item.author}</Text>
              <Text>{"Story: " + item.story}</Text>
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.getMoreStories}
          onEndReachedThreshold={0.7}
        /> 
        </View>
          )
      }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'yellow',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'blue'
    }
  })