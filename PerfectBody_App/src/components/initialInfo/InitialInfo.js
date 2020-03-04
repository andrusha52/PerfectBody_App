import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Sae } from "react-native-textinput-effects";
import {
  ScrollView,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Form,
  View,
  Image
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CalcModalResult from "../CalcModalResult";
import { postInfo } from "../../operations/authorizationOperations";
import { userData } from "../../redux/act";

const styleText = {
  paddingRight: "28%",
  textAlign: "left",
  marginLeft: "10%",
  fontSize: "18px",
  marginBottom: "5%",
  fontFamily: 'Verdana',
  color: '#000',
  fontWeight: '700',
  paddingTop: '10%'
};

const styleInput = {
  marginLeft: "10%",
  marginRight: "10%",
  borderWidth: 2,
  borderColor: '#000',
  backgroundColor: "red",
  display: "block"
};

const pickerSelectStyles= {
  inputIOS:{
    borderWidth: 1,
    marginTop:'10%',
    marginRight: '10%', 
    marginLeft: '10%', 
    height: 40, 
    borderColor:'transparent',  
    borderTopColor: 'transparent', 
    borderBottomColor: "#999daa", 
    borderWidth: 1, 
    marginBottom: '4%', 
    paddingBottom: '6%',
    marginBottom: "5%",
    fontFamily: 'Verdana',
    color: 'rgb(153, 157, 170)',
    fontWeight: '700', 
    fontSize: "18px"
  }
 
}

const buttonDesign={
  display: 'block', 
  marginLeft: '15%',
  marginTop: '10%',
  width: '70%',
  height: '8%',
  borderRadius: 20,
  borderWidth: 1,
  backgroundColor: '#fc842c', 
  borderColor: '#fff',
  marginBottom: '5%'
}

const textDesign={
  textAlign: 'center',
  padding: '8%',
  color: '#fff',
  fontSize: '18px'
}

const logStyle={
  textAlign: 'right',
  fontSize: '18px',
  marginLeft: '80%',
  color: '#000',
  marginTop: '-4%'
}

const regStyle={
  textAlign: 'right',
  fontSize: '18px',
  marginLeft: '62%',
  color: '#000',
  marginTop: '4%',
}

const headerDesign={
  borderColor:'transparent',  
    borderTopColor: 'transparent', 
    borderBottomColor: "rgb(153, 157, 170)", 
    borderWidth: 3,
    padding: 20
}


const initialState = {
  height: "",
  age: "",
  currentWeight: "",
  desiredWeight: "",
  groupBlood: "",
  dailyRate: "",
  productsByBloodType: []
};

class InitialInfo extends Component {
  state = {
    ...initialState,
    isModalVisible: false
  };

  handleSubmit = () => {
  
      this.setState(prevState => ({
        isModalVisible: !prevState.isModalVisible
      }));
    

      const calculated =
        (10 * this.state.currentWeight + 6,
        25 * this.state.height -
          5 * this.state.age -
          161 -
          10 * (this.state.currentWeight - this.state.desiredWeight));

      if (Number(this.state.groupBlood) === 1) {
        this.setState({
          productsByBloodType: [
            "Овсяная, пшенная, кукурузная каши",
            "Рожь и чечевица",
            "Жирные молочные продукты",
            "Все виды капусты и яблоки"
          ]
        });
      } else if (this.state.groupBlood === 2) {
        this.setState({
          productsByBloodType: [
            "Все виды мяса",
            "Капуста",
            "Жирные молочные продукты"
          ]
        });
      } else if (this.state.groupBlood === 3) {
        this.setState({
          productsByBloodType: [
            "Крупы (особенно пшеница, гречка)",
            "Орехи (стоит избегать арахиса)",
            "Выпечка",
            "Некоторые виды мяса (говядина, индейка)"
          ]
        });
      } else if (this.state.groupBlood === 4) {
        this.setState({
          productsByBloodType: [
            "Некоторые крупы (гречка, кукуруза)",
            "Фасоль",
            "Кунжут"
          ]
        });
      }

      this.setState({
        dailyRate: calculated
      });

      this.props.userData(this.state);
  };


  handleChange = (name, value) => {
    this.setState({ [name]: Number(value) });

  };

  render() {
    const {
      height,
      age,
      currentWeight,
      desiredWeight,
      groupBlood,
      isModalVisible,
      productsByBloodType
    } = this.state;
    return (
      <ScrollView>
        <View style={headerDesign}>
        <Image  
          style={{width: 50, height: 50}}
          source={require('../../image/logo-png.png')}
        />
       
     
          <TouchableOpacity onPress={()=>{this.props.navigation.jumpTo('Login')}} style={{position:"absolute", top:27,left:10,padding:10}}>
          <Text style={logStyle}>Вход |</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{this.props.navigation.jumpTo('Regist')}} style={{position:"absolute", top:27,left:10,padding:10}}>
          <Text style={regStyle}>Регистрация</Text>
          </TouchableOpacity>
        
          </View>
       
     

        <Text style={styleText}>
          Узнай свою суточную норму калорий прямо сейчас
        </Text>

        <TextInput
          keyboardType="number-pad"
          placeholder="Рост *"
          minLength="1"
          maxLength='3'
          id="height"
          style={{marginTop:'10%', marginRight: '10%', marginLeft: '10%', height: 40, borderColor:'transparent',  borderTopColor: 'transparent', borderBottomColor: "#999daa", borderWidth: 1, marginBottom: '4%', paddingBottom: '5%',   fontSize: "18px",
          marginBottom: "5%",
          fontFamily: 'Verdana',
          color: 'rgb(153, 157, 170)',
          fontWeight: '700', }}
          label={"Height *"}
          onChangeText={text => this.handleChange("height", text)}
          value={height}
        />
        <TextInput
          placeholder="Возраст *"
          keyboardType="number-pad"
          minLength="2"
          maxLength="2"
          id="age"
          style={{marginTop:'10%', marginRight: '10%', marginLeft: '10%', height: 40, borderColor:'transparent',  borderTopColor: 'transparent', borderBottomColor: "#999daa", borderWidth: 1, marginBottom: '4%', paddingBottom: '5%',   fontSize: "18px",
          marginBottom: "5%",
          fontFamily: 'Verdana',
          color: 'rgb(153, 157, 170)',
          fontWeight: '700', }}
          label={"Age *"}
          onChangeText={text => this.handleChange("age", text)}
          value={age}
        />
        <TextInput
          placeholder="Текущий вес *"
          keyboardType="number-pad"
          minLength="2"
          maxLength="3"
          id="currentWeight"
          style={{marginTop:'10%', marginRight: '10%', marginLeft: '10%', height: 40, borderColor:'transparent',  borderTopColor: 'transparent', borderBottomColor: "#999daa", borderWidth: 1, marginBottom: '4%', paddingBottom: '5%',   fontSize: "18px",
          marginBottom: "5%",
          fontFamily: 'Verdana',
          color: 'rgb(153, 157, 170)',
          fontWeight: '700', }}          
          label={"Current Weight *"}
          onChangeText={text => this.handleChange("currentWeight", text)}
          value={currentWeight}
        />
        <TextInput
          placeholder="Желаемый вес *"
          keyboardType="number-pad"
          minLength="2"
          maxLength="3"
          id="desiredWeight"
          style={{marginTop:'10%', marginRight: '10%', marginLeft: '10%', height: 40, borderColor:'transparent',  borderTopColor: 'transparent', borderBottomColor: "#999daa", borderWidth: 1, marginBottom: '4%', paddingBottom: '5%',   fontSize: "18px",
          marginBottom: "5%",
          fontFamily: 'Verdana',
          color: 'rgb(153, 157, 170)',
          fontWeight: '700', }}          
          label={"Target Weight *"}
          onChangeText={text => this.handleChange("desiredWeight", text)}
          value={desiredWeight}
        />

        <RNPickerSelect
          value={groupBlood}
          onValueChange={text => this.handleChange("groupBlood", text)}
          style={pickerSelectStyles}
          items={[
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 }
          ]}
        />

        <TouchableOpacity onPress={this.handleSubmit} style={buttonDesign}>
          <Text style={textDesign}>Похудеть</Text>
        </TouchableOpacity>
        {isModalVisible && (
          <CalcModalResult
            JumpTo={this.props.navigation.jumpTo}
            dailyRate={this.state.dailyRate}
            productsByBloodType={productsByBloodType}
          />
        )}

        {/* <Sae
        style={styleInput}
        label={"Height"}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
      />
      <Sae
        style={styleInput}
        label={"Age"}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
      />
      <Sae
        style={styleInput}
        label={"Current Weight"}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
      />
      <Sae
        style={styleInput}
        label={"Target Weight"}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
      />
      <Sae
        placeholder="dfsdfs"
        style={styleInput}
        label={"Blood Type"}
        iconClass={FontAwesomeIcon}
        iconName={"pencil"}
        iconColor={"black"}
      /> */}
      </ScrollView>
    );
  }
}

export default connect(
  null,
  { userData }
)(InitialInfo);
