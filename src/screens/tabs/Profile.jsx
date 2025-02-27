import { Text, View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { StackTypes } from "../../routes/stack";
import Icon from "react-native-vector-icons/FontAwesome5";

import profile from "./../../assets/img/profile1.png"

export default function Profile() {
  const name = "Tauan Freire"
  const email = "freiretauan@gmail.com"
  // const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.perfil}>
        <View style={styles.avatar}>
        <Image style={styles.img} source={profile}/>
        <Icon style={{alignSelf: "center"}} name={"camera"} size={20} color={"black"}/>
        </View>
        {/* <View style={styles.infos}>
          <Text>{name}</Text>
          <Text>{email}</Text>
          </View> */}
        {/* <Text style={styles.text}> Estou no PROFILE </Text> */}
      </View>
          <View style={{marginTop: 40}}>
            <Text>NOME: </Text>
            <Text>CPF: </Text>
            <Text>EMAIL:</Text>
            <Text>NÚMERO: DE TELEFONE: </Text>
            <Text>DATA DE NASCIMENTO:</Text>
            <Text>SENHA: </Text>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    alignItems: "center",
    // justifyContent: "center",
    flex: 1,

  },
  text: {
    // backgroundColor: "red",
    fontSize: 30,
    // color: "red",
    fontWeight: "bold",
  },
  perfil:{
    display: "flex",
    // backgroundColor: "red",
    flexDirection: "row",
    marginTop: 100 
  },
  avatar:{
    // backgroundColor: "green",
 
  },
  infos:{
    backgroundColor: "blue",
    justifyContent: "space-around"

  },
  img:{
    borderRadius: 100,
    borderWidth: 10,
    borderColor: "white"
  }
});
