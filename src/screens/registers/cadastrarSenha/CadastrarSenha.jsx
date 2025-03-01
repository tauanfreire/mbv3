import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";

import bcrypt from "react-native-bcrypt";
var salt = bcrypt.genSaltSync(10);

const showP = require("./../../../assets/img/openP.png");
const offP = require("./../../../assets/img/offP.png");

export default function Senha() {
  const route = useRoute();
  const usuarioRota = route.params.usuario;
  const navigation = useNavigation();
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState({
    nome: usuarioRota.nome,
    email: usuarioRota.email,
    cpf: usuarioRota.cpf,
    numeroTelefone: usuarioRota.numeroTelefone,
    dataNascimento: usuarioRota.dataNascimento,
    senha: "", // Inicializa sem senha
  });

  const [validacoes, setValidacoes] = useState({
    tamanho: false,
    maiuscula: false,
    numero: false,
    especial: false,
    espaco: false,
  });

  async function cadastrarSenha() {
    const hash = bcrypt.hashSync(senha, salt);
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      senha: hash,
    }));
    console.log("Senha criptografada:", hash);
  }

  async function cadastrarUser() {
    try {
      // console.log("entrei no TRY");
      await api.post("/usuarios", {
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        dataNascimento: usuario.dataNascimento,
        numeroTelefone: usuario.numeroTelefone,
        senha: usuario.senha,
      });
      // console.log("Resposta do servidor:", response.data);
      // console.log("Resposta do servidor:", response.data.cpf);
      // console.log("Resposta do servidor:", response.data.id);
    } catch (error) {
      // console.log(error)
      // console.info(error)
      console.log(
        "Erro ao criar usuário: ",
        error.response ? error.response.data : error.message
      );
    }
  }

  function verificarSenha(e) {
    const senhaSemEspaco = e.replace(/\s/g, "");
    setSenha(senhaSemEspaco);
    setValidacoes({
      tamanho: senhaSemEspaco.length >= 8,
      maiuscula: /[A-Z]/.test(senhaSemEspaco),
      numero: /\d/.test(senhaSemEspaco),
      especial: /[!@#$%^&*(),.?":{}|<>]/.test(senhaSemEspaco),
      espaco: !/\s/.test(senhaSemEspaco),
    });
  }

  function getIcon(status) {
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
                const todasValidacoesPassam = Object.values(validacoes).every(
                  (v) => v === true
                );
                if (!todasValidacoesPassam) {
                  alert("Erro, cumpra todos os requisitos da senha.");
                  return;
                }
                cadastrarSenha();
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
