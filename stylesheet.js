import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonLayoutRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingHorizontal: 48,
  },

  HeaderStyle: {
    color: "black",
    fontSize: 48,
    paddingVertical: 48,
    alignSelf: "center",
  },

  subTextStyle: {
    color: "black",
    opacity: 0.5,
    paddingVertical: 16,
    fontSize: 24,
    alignSelf: "center",
  },

  buttonStyle: {
    alignItems: "center",
    backgroundColor: "green",
    color: "white",
    padding: 10,
    borderRadius: 50,
    width: 100,
    textAlign: "center",
  },
});

export default styles;

export const navigationStyle = {
  
  HeaderStyle1: {
    title: "Got what to do ?",
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    headerTitleAlign: {
      alignSelf: "center",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  },


};
