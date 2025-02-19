import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { StackTypes } from "../../routes/stack";

export default function Profile() {
  // const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}> Estou no PROFILE </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    // backgroundColor: "red",
    fontSize: 30,
    color: "red",
    fontWeight: "bold",
  },
});
