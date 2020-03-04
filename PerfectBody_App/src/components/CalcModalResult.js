import React, { Component } from "react";
import { connect } from "react-redux";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Text, View, TouchableOpacity, Button, FlatList, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import shortid from "shortid";
import { ListItem } from "react-native-elements";

const stylesModal = {
  width: "100%",
  height: '100%',
  backgroundColor: "#fff",
  position: "absolute",
};

const textStyle = {
  fontSize: "30px",
  fontWeight: "bolder",
  marginTop: "15%",
  padding: "6%",
  textAlign: "left",
  marginBottom: "8%"
};

const styleText = {
  fontSize: "23px",
  fontWeight: "bolder",
  padding: "10%",
  textAlign: "left"
};

const resCaloriesStyle = {
  fontSize: "47px",
  color: "color:rgb(40, 64, 96)",
  fontWeight: "700",
  letterSpacing: "5px",
  textAlign: "center"
};

const caloriesText = {
  fontSize: "30px",
  color: "color:rgb(40, 64, 96)",
  fontWeight: "700",
  textAlign: "center",
  letterSpacing: "0px"
};

const btnDesign = {
  display: "block",
  marginLeft: "15%",
  marginTop: "-20%",
  width: "70%",
  height: 70,
  borderRadius: 20,
  borderWidth: 1,
  backgroundColor: "#fc842c",
  borderColor: "#fff"
};

const textDes = {
  textAlign: "center",
  padding: "8%",
  color: "#fff",
  fontSize: "18px",
  marginBottom: '15%'
};

class CalcModalResult extends Component {
  state = { isVisible: true };
  handleClose = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  };

  render() {
    let counter=1;
    return (
      
    <>  
   
        {this.state.isVisible && (
             
          <View style={stylesModal}>
      
            <View
              style={{ backgroundColor: "tomato", width: "100%", height: "8%" }}
            >
              
              <TouchableOpacity
                onPress={this.handleClose}
                style={{ position: "absolute", top: 27, left: 10, padding: 10 }}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  color={"#e1f500"}
                  size={16}
                />
              </TouchableOpacity>
            </View>

          
            <Text style={textStyle}>
              Ваша рекомендуемая суточная норма калорий составляет:
            </Text>
            <Text style={resCaloriesStyle}>
              {this.props.dailyRate} <Text style={caloriesText}>ккал</Text>
            </Text>
            <View
              style={{
                width: "90%",
                marginRight: "15%",
                marginLeft: "3%",
                marginTop: "10%",
                marginBottom: "8%",
                height: 1,
                backgroundColor: "#000"
              }}
            />
            <Text style={styleText}>
              Продукты, которые вам не рекомендуется употреблять:</Text>
          
             
              <FlatList
              data={this.props.productsByBloodType}
              renderItem={({item}) => (
                <ListItem
                  leftElement={counter++}
                  title={item}
                  titleStyle={{ color: "rgb(153, 157, 170)", display: 'block', fontSize: '20px' }}
                />
              )}
              keyExtractor={()=>shortid()}
              />


            {!this.props.isAuth && (


              <TouchableOpacity
                style={btnDesign}
                onPress={() => {
                  this.props.JumpTo("Login");
                }}
              >
                <Text style={textDes}>Начать худеть</Text>
              </TouchableOpacity>
           
            )}
           
          </View>
          
        )}
      
</>



    );
  }
}
const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(CalcModalResult);
