import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 20,
    height: 40,
    width: "70%",
    borderBottomColor: "orange",
    borderBottomWidth: 1,
    borderStyle: "solid",
    color: "grey",
    fontSize: 18
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 30,
    width: 200
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "open-bold"
  }
});
