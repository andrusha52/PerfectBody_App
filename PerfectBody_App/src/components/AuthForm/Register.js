import React, { Component } from "react";
import { ScrollView, Button, TextInput, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import errorNotification from '../../components/errorNotification'

const styleText = {
  paddingRight: "32%",
  textAlign: "left",
  marginLeft: "10%",
  paddingTop: "50%",
  fontWeight: "bold",
  fontSize: "20px",
  marginBottom: "5%"
};

const styleInput = {
  margin: 15,
  height: 40,
  borderColor: 'red',
  borderWidth: 1
};

const initialState = {
  nickname: "",
  password: "",
  error: ''
};

class Register extends Component {
  state = {
    ...initialState
  };

  handleSubmit = async e => {
    e.preventDefault();

     if(this.state.nickname===''){
      
      alert('Please, enter a nickname!');
      return;
    }
    else if(this.state.password===''){
      alert('Please, enter a password!');
      return;
    }
    this.props.userData(this.state, this.props.auth.user);

    this.setState({
      ...initialState
    });
    
  
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
    setTimeout(()=>{
      if(this.state.nickname.length>0 && this.state.nickname.length<5){
        this.setState({error: 'Nickname must be at least 5 characters'})
      
      }
      else if(this.state.nickname.length>20){
        this.setState({error: 'Nickname must not contain more than 20 characters!'})
      }
      else if(this.state.password.length>0&&this.state.password.length<6){
        this.setState({error: 'Password must be at least 6 characters!'})
      }
  
      else if(this.state.password.length>20){
        this.setState({error: 'Password must not contain more than 20 characters!'})
      }
      else{
        this.setState({error:''})
      }
    }, 200)
  
    
   
  };
  render() {
    const { nickname, password, error } = this.state;

    return (
      <ScrollView>
        <TextInput
          id="nickname"
          name='Login'
          minlength='3'
          style={styleInput}
          label={"Login *"}
          onChangeText={text => this.handleChange("nickname", text)}
          value={nickname}
        />
       
        <TextInput
          id="password"
          name='Password'
          minlength='6'
          style={{borderTopLeftRadius:20, height: 40, borderColor: "gray", borderWidth: 1, marginLeft: '15%',  marginRight: '15%'}}
          label={"Password *"}
          onChangeText={text => this.handleChange("password", text)}
          value={password}
        />
 <Text style={{textAlign: 'center', color: 'red'}}>{error}</Text>
         <Button onPress={this.handleSubmit} title={this.props.formName} />
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => state


export default connect(mapStateToProps)(Register);
