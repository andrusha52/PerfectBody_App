import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { styles } from "./AuthForm.styles";

const initialState = {
  nickname: "",
  password: ""
};

class Register extends Component {
  state = {
    ...initialState
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.props.register(this.state, this.props.auth.user);

    this.setState({
      ...initialState
    });
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };
  render() {
    const { nickname, password } = this.state;

    return (
      <View style={styles.wrap}>
        <TextInput
          id="nickname"
          minLength={3}
          style={styles.input}
          label={"Login *"}
          placeholder="Логин"
          returnKeyType="done"
          onChangeText={text => this.handleChange("nickname", text)}
          value={nickname}
        />
        <TextInput
          id="password"
          minLength={6}
          style={styles.input}
          label={"Password *"}
          placeholder="Пароль"
          secureTextEntry={true}
          returnKeyType="done"
          onChangeText={text => this.handleChange("password", text)}
          value={password}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>{this.props.formName}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Register);
