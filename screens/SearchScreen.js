import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity,FlatList } from 'react-native';
import db from '../config';
import { help } from 'yargs';
import { auto } from 'async';

export default class SearchScreen extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            allTransactions : [],
            lastVisibleTransaction : null,
            search : ''
        }
    }

    fetchMoreTransactions = async()=>{
        var text = this.state.search.toLowerCase()
        var enteredText = text.split("")

        if(enteredText[0].toUpperCase()==='B'){
            const query = await db.collection("transactions").where('bookId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get();
            query.docs.map((doc)=>{
                this.setState({
                    allTransactions : [...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction : doc
                })
            })

        }
        else if(enteredText[0].toUpperCase()==='S'){
            const query = await db.collection("transactions").where('studentId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get();
            query.docs.map((doc)=>{
                this.setState({
                    allTransactions : [...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction : doc
                })
            })

        }
    }



    searchTransactions = async(text)=>{
        
        var enteredText = text.split("")
        var text = text.toUpperCase()
        if(enteredText[0].toUpperCase()==='B'){
            const query = await db.collection("transactions").where('bookId','==',text).get();
            query.docs.map((doc)=>{
                this.setState({
                    allTransactions : [...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction : doc
                })
            })

        }
        else if(enteredText[0].toUpperCase()==='S'){
            const query = await db.collection("transactions").where('studentId','==',text).get();
            query.docs.map((doc)=>{
                this.setState({
                    allTransactions : [...this.state.allTransactions,doc.data()],
                    lastVisibleTransaction : doc
                })
            })

        }
    }


    componentDidMount = async()=>{
        const query = await db.collection("transactions").limit(10).get()
        query.docs.map((doc)=>{
            this.setState({
                allTransactions : [],
                lastVisibleTransaction : doc
            })
        })
    }
    render()
    {
        return(
            <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
               <View style = {styles.searchBar}>
                   <TextInput
                   style = {styles.bar}
                   placeholder = "Enter BookId Or StudentId"
                   onChangeText = {(text)=>{this.setState({search : text})}}
                   />
                   <TouchableOpacity style = {styles.searchButton}
                   onPress = {()=>{this.searchTransactions(this.state.search)}}
                   >
                      <Text>Search</Text> 
                   </TouchableOpacity>
               </View>
            <FlatList
            data = {this.state.allTransactions}
            renderItem = {({item})=>(
                <View style = {{borderBottomWidth : 2}} >
                    <Text>{"bookId :  "+ item.bookId}</Text>
                    <Text>{"studentId :  "+ item.studentId}</Text>
                    <Text>{"transactionType :  "+ item.transactionType}</Text>
                    <Text>{"date :  "+ item.date.toDate()}</Text>
                </View>
            )}
                keyExtractor = {(item,index)=>index.toString()}
                onEndReached = {this.fetchMoreTransactions}
                onEndReachedThreshold = {0.7}
            />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    searchBar : { 
        flexDirection : 'row',
        height : 40,
        borderWidth: 0.5,
        width : 'auto',
        alignItems : 'center',
        backgroundColor : 'grey'
    },
    bar : {
        borderWidth : 2,
        height : 30,
        width : 30,
        paddingLeft : 10,

    },
   searchButton : {
       height : 30,
       width : 40,
       alignItems : 'center',
       justifyContent : 'center',
       backgroundColor : 'green',
       borderWidth : 1
   } 
})

