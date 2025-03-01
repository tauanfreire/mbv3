import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";

// var bcrypt = require('bcryptjs');
import bcrypt from "react-native-bcrypt";
var salt = bcrypt.genSaltSync(10);

const showP = require("./../../../assets/img/openP.png");
const offP = require("./../../../assets/img/offP.png");

import api from "../../../services/api";

export default function Senha() {

  useEffect(() =>{
    setUsuario({
      nome: name,
      email: email,
      cpf: cpf,
      numeroTelefone: numberPhone,
      dataNascimento: dataNasc,
      senha: senha
    })
    console.log("ENTREI NO USE EFECT")
    console.log("SENHA: " + senha);
    console.log("CPF : " + usuario.cpf)
    console.log("NOME : " + usuario.nome)
    console.log(usuario.dataNascimento)
    console.log(usuario.numeroTelefone)
    console.log(usuario.email)
    console.log("SAI DO USE EFECT")
  }, [senha])
  
  
  const route = useRoute();
  const { name, email, cpf, numberPhone, dataNasc } = route.params;
  const [usuario, setUsuario] = useState({
    nome: name,
    email: email,
    cpf: cpf,
    numeroTelefone: numberPhone,
    dataNascimento: dataNasc,
    senha: null
  })
  // const usuario = {

  // const [origemAtual, setOrigemAtual] = useState(origem);
  const navigation = useNavigation();
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senha, setSenha] = useState("");
  const [validacoes, setValidacoes] = useState({
    tamanho: null,
    maiuscula: null,
    numero: null,
    especial: null,
    espaco: null,
  });

  async function cadastrarSenha() {
    try {
      console.log("entrei no tyr");

      console.log(senha);
      var hash = bcrypt.hashSync(senha, salt);
      console.log(senha);

      await api.put(`usuarios/${"67c112704281e892755ff92c"}`, {
        senha: hash,
      });
      setSenha(hash)
      Alert.alert("Senha atualizada com sucesso");
      // navigation.navigate('CadastrarCartao')
    } catch (error) {
      console.log(error);
    }
  }

  function verificarSenha(e) {
    // Remove espaços em branco automaticamente
    const senhaSemEspaco = e.replace(/\s/g, "");

    setSenha(senhaSemEspaco); // Atualiza a senha sem espaços
    setValidacoes({
      tamanho: senhaSemEspaco.length >= 8,
      maiuscula: /[A-Z]/.test(senhaSemEspaco),
      numero: /\d/.test(senhaSemEspaco),
      especial: /[!@#$%^&*(),.?":{}|<>]/.test(senhaSemEspaco),
      espaco: !/\s/.test(senhaSemEspaco),
    });

    // var bcryptVar = require('bcryptjs');
    // var has = bcryptVar.

    // const hashSenha = await bcrypt.hash(senha, 10)
    console.log(senha);
  }

  function getIcon(status) {
    if (status === null) return null;
    return status ? (
      <FontAwesome name="check-circle" size={18} color="green" />
    ) : (
      <FontAwesome name="times-circle" size={18} color="red" />
    );
  }

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
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={!senhaVisivel}
                value={senha}
                onChangeText={verificarSenha}
              />
              <TouchableOpacity
                onPress={() => setSenhaVisivel(!senhaVisivel)}
                style={styles.showPasswordButton}
              >
                <Image
                  source={senhaVisivel ? showP : offP}
                  style={styles.showPasswordIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.validationContainer}>
              <View style={styles.validationItem}>
                {getIcon(validacoes.tamanho)}
                <Text> Pelo menos 8 caracteres</Text>
              </View>
              <View style={styles.validationItem}>
                {getIcon(validacoes.maiuscula)}
                <Text> Pelo menos 1 letra maiúscula</Text>
              </View>
              <View style={styles.validationItem}>
                {getIcon(validacoes.numero)}
                <Text> Pelo menos 1 número</Text>
              </View>
              <View style={styles.validationItem}>
                {getIcon(validacoes.especial)}
                <Text> Pelo menos 1 caractere especial (!@#$...)</Text>
              </View>
            </View>
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                cadastrarSenha()
                navigation.navigate("CadastrarCartao", {usuario});
                // if(validacoes.espaco == null || validacoes.especial == null || validacoes.maiuscula == null || validacoes.numero == null || validacoes.tamanho == null){
                // }
                // for (let validacao in validacoes) {
                //   if (validacoes[validacao] == false) {
                //     Alert.alert("Cumpra todos os requsitots da senha!");
                //     break;
                //   } else {
                //     cadastrarSenha();
                //     // // Load hash from your password DB.
                //     // var h =
                //     //   "$2a$10$opOJ44oOEscE1rIFQjnDF.fVBagfD4SpkLu0/.G21t5ekXGbxjbpK";
                //     // console.log(bcrypt.compareSync(senha, h)); // true
                //     // bcrypt.compareSync("not_bacon", h); // false
                //     // navigation.navigate('CadastrarCartao')
                //   }
                  // console.log(validacao + validacoes[validacao]);
                // }
                // validacoes.espaco ?
                // console.log(senha);
                // console.log(usuario.cpf)
                // console.log(usuario.nome)
                // console.log(usuario.dataNascimento)
                // console.log(usuario.numeroTelefone)
                // console.log(usuario.email)
                // for(let dado in usuario){
                //   console.log(usuario[dado])
                // }

                // var hash = bcrypt.hashSync(senha, salt);
                // console.log(senha);
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Continuar</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
    marginTop: 100,
  },
  formV: {
    flex: 1,
    justifyContent: "center",
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
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
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C9D3DB",
    paddingHorizontal: 10,
  },
  inputControl: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  showPasswordButton: {
    padding: 10,
  },
  showPasswordIcon: {
    width: 20,
    height: 20,
  },
  validationContainer: {
    marginTop: 10,
  },
  validationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
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
    fontWeight: "600",
    color: "#fff",
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
});
