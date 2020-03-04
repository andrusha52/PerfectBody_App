import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CalcModalResult from "../CalcModalResult";
import { userData } from "../../redux/act";
import { styles } from "./initialInfo.styles";
import { Ionicons } from "@expo/vector-icons";

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
    // this.props.navigation.navigate("Результат");
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
      <>
        {isModalVisible ? (
          <CalcModalResult
            JumpTo={this.props.navigation}
            dailyRate={this.state.dailyRate}
            productsByBloodType={productsByBloodType}
          />
        ) : (
          <View style={styles.warp}>
            <ScrollView>
              <Text style={styles.title}>
                Узнай свою суточную норму калорий прямо сейчас
              </Text>
              <View style={styles.inputBlock}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Рост *"
                  minLength={1}
                  maxLength={3}
                  id="height"
                  style={styles.input}
                  label={"Height *"}
                  onChangeText={text => this.handleChange("height", text)}
                  value={height}
                />
                <TextInput
                  placeholder="Возраст *"
                  keyboardType="number-pad"
                  minLength={2}
                  maxLength={2}
                  id="age"
                  style={styles.input}
                  label={"Age *"}
                  onChangeText={text => this.handleChange("age", text)}
                  value={age}
                />
                <TextInput
                  placeholder="Текущий вес *"
                  keyboardType="number-pad"
                  minLength={2}
                  maxLength={3}
                  id="currentWeight"
                  style={styles.input}
                  label={"Current Weight *"}
                  onChangeText={text =>
                    this.handleChange("currentWeight", text)
                  }
                  value={currentWeight}
                />
                <TextInput
                  placeholder="Желаемый вес *"
                  keyboardType="number-pad"
                  minLength={2}
                  maxLength={3}
                  id="desiredWeight"
                  style={styles.input}
                  label={"Target Weight *"}
                  onChangeText={text =>
                    this.handleChange("desiredWeight", text)
                  }
                  value={desiredWeight}
                />

                <View style={styles.selectorBlock}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Группа крови *",
                      value: null,
                      color: "grey"
                    }}
                    value={groupBlood}
                    onValueChange={text =>
                      this.handleChange("groupBlood", text)
                    }
                    style={styles.selector}
                    Icon={() => {
                      return (
                        <Ionicons
                          name="ios-arrow-dropdown"
                          size={19}
                          color="orange"
                        />
                      );
                    }}
                    items={[
                      { label: "1", value: 1 },
                      { label: "2", value: 2 },
                      { label: "3", value: 3 },
                      { label: "4", value: 4 }
                    ]}
                  />
                </View>
              </View>

              <View style={styles.buttonBlock}>
                <TouchableOpacity
                  onPress={this.handleSubmit}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Похудеть</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </>
    );
  }
}

export default connect(null, { userData })(InitialInfo);
