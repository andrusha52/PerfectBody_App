import React from 'react'
import {View, Text} from "react-native"


function DiaryScreen(props) {
    return (
      <View style={{alignSelf:"stretch", height:70,backgroundColor:"tomato" , alignItems:"center",padding:0,margin:0 }}>
    
    <Text style={{paddingTop:35, color:"#e1f500",}}>{props.route.name}</Text>
    </View>)
  }

export default DiaryScreen;
