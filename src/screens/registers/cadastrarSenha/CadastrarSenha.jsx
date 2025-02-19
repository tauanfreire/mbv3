import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
// import { StackTypes } from "../../../routes/stack";

const showP = require("./../../../assets/img/openP.png")
const offP = require("./../../../assets/img/offP.png")



export default function Senha() {
  const navigation = useNavigation()

  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senha, setSenha] = useState('');
  const [form, setForm] = useState({
    nome: "",
    email: "taua",
    cpf: "",
    dataNascimento: "",
    numeroTelefone: "",
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Cadastrar no <Text style={{ color: "#075eec" }}>MobCocais</Text>
        </Text>

        <Text style={styles.subtitle}>
          Crie uma senha para ter acesso ao MobCocais
        </Text>
      </View>

      <View style={styles.formV}>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Senha</Text>

            <View style={styles.inputView}>
              
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={!senhaVisivel}
                value={senha}
                onChangeText={setSenha}
              />

              <TouchableOpacity
                onPress={() => setSenhaVisivel(!senhaVisivel)}
                style={styles.showPasswordButton}
                >
                <Image source={senhaVisivel? showP: offP}/>

              </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Use letras maíusculas e números</Text>
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CadastrarCartao')
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Continuar</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login')
            }}
          >
            <Text style={styles.formLink}>Já tem uma conta? Faça o login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8ecf4",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  /** Header */
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
    marginTop: 100,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#075eec",
    textAlign: "center",
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
    width: "100%"
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    height: 50,
    marginRight: 10,

    borderRadius: 12,
    fontSize: 15,
    color: "#222",
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  formV: {
    flex: 1,
    justifyContent: "center",
  },
  showPasswordButton:{
    justifyContent: "center",
    marginRight: 10
  }
});
