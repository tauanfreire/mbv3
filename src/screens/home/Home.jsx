import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
// import { StackTypes } from "../../routes/stack";

// const main = require("./../img/main.jpg");
const main = require("./../../assets/img/main.jpg");
const googleIcon = require("./../../assets/img/google2.png");

import { styles } from "./style";

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={main} resizeMode="contain" style={styles.image}>
        <View style={styles.conteudo}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Bem-Vindo ao <Text style={{ color: "#075eec" }}>MobCocais</Text>
            </Text>

            <Text style={styles.subtitle}>
              Cadastre-se ou faça login para começar a usar
            </Text>
          </View>
          <View style={styles.btnV}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.textBtn}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("Cadastrar")}
            >
              <Text style={styles.textBtn}>CADASTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleBtn}>
              <View style={styles.googleBtnV}>
                <Image source={googleIcon}></Image>
                <Text style={styles.textBtnGoogle}>CONTINUAR COM O GOOGLE</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
