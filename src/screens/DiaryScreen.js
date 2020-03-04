import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from "react-native";
import {connect} from "react-redux"
import axios from "axios";
import { AppLoader } from "../components/ui/AppLoader";
import SearchAdd from "../components/diary/SearchAdd";
import CalendarAdd from "../components/diary/CalendarAdd";
import { FlatGrid } from "react-native-super-grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";



function yyyymmdd() {
  function twoDigit(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var now = new Date();
  return (
    "" +
    now.getFullYear() +
    "-" +
    twoDigit(now.getMonth() + 1) +
    "-" +
    twoDigit(now.getDate())
  );
}



class DiaryScreen extends Component {
  state = {
    data: yyyymmdd(),
    calendarIsOpen: false,
    dayIngredients: [],
    dataURL: Date.now(),
    preLoader: false,

  };

  componentDidMount() {

    if (this.state.dayIngredients.length === 0) {
      this.getDayIngredients();
    }

  }

  selectedDate = value => {
    this.setState({
      data: value.dateString,
      dataURL: value.timestamp,
      calendarIsOpen: false
    });
    this.getDayIngredients();
  };

  openCalendar = () => {
    this.setState({
      calendarIsOpen: true
    });
  };

  getDayIngredients = async () => {
    this.setState({
      preLoader: true
    });
    await axios
      .get(
        `https://slim-moms.goit.co.ua/api/v1/user/eats/${new Date(
          this.state.dataURL
        ).toISOString()}`,
        {
          headers: {
            Authorization: this.props.auth.token
          }
        }
      )
      .then(data =>
        this.setState({
          dayIngredients: data.data.products.reverse()
        })
      )
      .finally(() => this.setState({ preLoader: false }));
  };

  onRemoveItem = async id => {
    await axios.delete(`https://slim-moms.goit.co.ua/api/v1/user/eats/${id}`, {
      headers: {
        Authorization: this.props.auth.token
      }
    });
    await this.getDayIngredients();
  };

  render() {
    return (
      <View>
        <View style={styles.openCalendar}>
          <View style={styles.calendar}>
          <Text>Сводка за:</Text>
          <TouchableOpacity onPress={this.openCalendar}>
            <Text style={styles.calendarData}>{this.state.data}  <MaterialCommunityIcons name="calendar" size={15} color="#fc842c" /></Text>
          </TouchableOpacity>
          </View>
        </View>

        {this.state.preLoader &&  <AppLoader /> }

        <SearchAdd getDayIngredients={this.getDayIngredients} token={this.props.auth.token}/>

        <View style={styles.listWrap}>
        <View style={styles.horizontLine}/>
<ScrollView>
            <View>
              {this.state.dayIngredients.length < 1 ? (
                <Text>Здесь будет отображаться Ваш рацион!</Text>
              ) : (
                <>
                <View style={styles.ingridientLi}>
                <Text style={styles.aboutTextProduct}>Продукт :</Text>
                <Text style={styles.aboutText}>Калории :</Text>
                <Text style={styles.aboutText}>Грамм :</Text>
                <View style={{width:25}}/>
                </View>
                  <FlatGrid
                    itemDimension={200}
                    items={this.state.dayIngredients}
                    renderItem={({ item }) => (
                      <View style={styles.ingridientLi}>
                        <View  style={styles.productConteiner}>
                        <Text>{item.title.ru}</Text>
                        </View>
                        <View>
                        <Text>{item.calories}</Text>
                        </View>
                       <View  style={styles.gramConteiner}>
                       <Text>{item.weight}</Text>
                       </View>
                      
                        <TouchableOpacity
                          id={item._id}
                          onPress={() =>
                            setTimeout(() => {
                              this.onRemoveItem(item._id);
                            }, 0)
                          }
                          style={styles.btnDeleteIngridiend}
                          keyExtractor={(item)=>item.id}
                        >
                            <MaterialCommunityIcons name="delete" size={15} color="white" />
                        </TouchableOpacity>
                      </View>
                    )}
                    keyExtractor={item => item._id}
                  />
                </>
              )}
             
            </View>
            </ScrollView>
        </View>

        {this.state.calendarIsOpen ? (
          <CalendarAdd selectedDate={this.selectedDate} />
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = (state) => state


export default connect(mapStateToProps)(DiaryScreen);




const styles = StyleSheet.create({

  openCalendar: {
    alignItems: "center",
    padding: 10
  },
  listWrap: {
    marginTop: 50
  },
  item: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#32a852",
    borderWidth: 1,
    margin: 2
  },
  button: {
    backgroundColor: "#f16d6b",
    alignItems: "center",
    justifyContent: "center",
    width: 15,
    height: 15,
    borderRadius: 100,
    marginLeft: 10
  },
  calendar:{
    display:"flex",
    alignContent:"center",
    flexDirection:"row",
    width:200,
  },
  calendarData:{
    paddingLeft:5,
    fontWeight:"bold",
    fontSize:15
  },
  horizontLine:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  btnDeleteIngridiend:{
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  ingridientLi:{
    marginVertical:10,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",

  },
  aboutText:{
    fontWeight:"bold",
    marginBottom:4
  },
  aboutTextProduct:{
    paddingLeft:10,
    fontWeight:"bold",
    marginBottom:4,
    width:120
  },
  productConteiner:{
    width: 120,
  },
  gramConteiner:{
    width:30,
    alignContent:"center",
    marginLeft:20
  }
});
