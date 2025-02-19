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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import { StackTypes } from "../../routes/stack";

const showP = require("./../../assets/img/openP.png");
const offP = require("./../../assets/img/offP.png");

export default function Login() {
  const navigation = useNavigation();
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  // });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Login <Text style={{ color: "#075eec" }}>MobCocais</Text>
          </Text>

          <Text style={styles.subtitle}>Faça seu login no MobCocais</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email ou CPF</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={setEmail}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
            />
          </View>

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
                <Image source={senhaVisivel ? showP : offP} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                if(email == "teste@123" && senha == "123"){
                  navigation.navigate("TabComponent");

                }
                else{
                  alert("Senha ou email errados")
                }
                // NavigationHelpersContext.
                // navigation.navigate("Main")
                // NavigationHelpersContext.n
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Entrar</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle link
            }}
          >
            <Text style={styles.formLink}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Cadastrar");
          // handle link
        }}
      >
        <Text style={styles.formFooter}>
          Ainda não se cadastrou?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
    marginTop: "30%",
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
  /** Input */
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
    // width: "50%"
  },
  /** Button */
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
  showPasswordButton: {
    justifyContent: "center",
    marginRight: 10,
  },
});
