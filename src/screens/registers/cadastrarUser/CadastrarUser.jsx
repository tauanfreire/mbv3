import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
// import { StackTypes } from "../../../routes/stack";

// import api from "../../../services/api";

import api from './../../../services/api'

export default function Cadastrar() {

  // async function createUsers(){

  //   try {
  //     const response = await api.get('/usuarios', );
  //     console.log(name)
  //     console.log(email)
  //     console.log(cpf)
  //     console.log(numberPhone)
  //     console.log(dataNasc)
  //     await api.post("/usuarios", {
  //       name: name,
  //       email: email,
  //       cpf: cpf,
  //       nasc: dataNasc,
  //       numberPhone: numberPhone
  //     })
      
  //   } catch (error) {
  //     console.log("Erro ao criar usuário: " + error);
      
  //   }
    
  // }
  async function createUser() {
    try {
        console.log("entrei no TRY")
        console.log(name);
        console.log(cpf);
        console.log(dataNasc);
        console.log(email);
        console.log(numberPhone);
        const response = await api.post("/usuarios", {
            name: name,
            email: email,
            cpf: cpf,
            nasc: dataNasc,
            numberPhone: numberPhone,
            password: "vazio"
        });
        console.log("Resposta do servidor:", response.data);
        console.log("Resposta do servidor:", response.data.cpf);
        console.log("Resposta do servidor:", response.data.id);
    } catch (error) {
        console.log(error)
        console.info(error)
        console.log("Erro ao criar usuário: ", error.response ? error.response.data : error.message);
    }
}

  // name: req.body.name,
  // email: req.body.email,
  // cpf: req.body.cpf,
  // numberPhone: req.body.numberPhone,
  // nasc: req.body.nasc,
  // password: req.body.password
  
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);

  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);

  const [cpf, setCpf] = useState("");
  const [cpfVerify, setCPFVerify] = useState(false);

  const [dataNasc, setDataNasc] = useState("");
  const [dataNascVerify, setDataNascVerify] = useState(false);

  const [numberPhone, setNumberPhone] = useState("");
  const [numberPhoneVerify, setNumberVerify] = useState(false);

  const [idade, setIdade] = useState(null);

  function verificarName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(false);
    console.log(e.nativeEvent.text);

    if (nameVar.length > 1) {
      // console.log(")
      setNameVerify(true);
    }
    // setName(e)
  }

  function verificarEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
    setEmailVerify(false);
    console.log(e.nativeEvent.text);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(emailVar)) {
      setEmail(emailVar);
      setEmailVerify(true);
    }
  }

  function verificarCPF(e) {
    const cpfVar = e.nativeEvent.text;
    setCpf(cpfVar);
    setCPFVerify(false); // Começa como falso

    console.log(cpfVar); // Debug

    const cpfNumerico = cpfVar.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cpfNumerico.length !== 11) return;

    // Regex para evitar CPFs com todos os números iguais
    if (/^(\d)\1+$/.test(cpfNumerico)) return;

    // Validação dos dígitos verificadores
    const validarDigito = (cpf, multiplicador) => {
      let soma = 0;
      for (let i = 0; i < multiplicador - 1; i++) {
        soma += parseInt(cpf[i]) * (multiplicador - i);
      }
      let resto = (soma * 10) % 11;
      return resto === 10 || resto === 11 ? 0 : resto;
    };

    if (validarDigito(cpfNumerico, 10) !== parseInt(cpfNumerico[9])) return;
    if (validarDigito(cpfNumerico, 11) !== parseInt(cpfNumerico[10])) return;

    setCPFVerify(true);
  }

  // function registerUser(){
  //   console.log(name)
  //   console.log(email);
  //   console.log(cpf);
  //   console.log(numberPhone);
  //   console.log(dataNasc);
    
  // }

  function verificarNumeroTelefone(e) {
    const phoneVar = e.nativeEvent.text;
    setNumberPhone(phoneVar);
    setNumberVerify(false); // Começa como falso

    console.log(phoneVar); // Debug

    const phoneNumerico = phoneVar.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (phoneNumerico.length >= 11 && phoneNumerico.length <= 12) {
      setNumberVerify(true);
    }
  }

  function verificarDataNascimento(e) {
    let dataVar = e.nativeEvent.text;
    setDataNasc(dataVar);
    setDataNascVerify(false);

    console.log(dataVar); // Debug

    // Ajustar formato caso venha sem barras (ex: "23072005" → "23/07/2005")
    if (/^\d{8}$/.test(dataVar)) {
      dataVar = `${dataVar.slice(0, 2)}/${dataVar.slice(2, 4)}/${dataVar.slice(
        4,
        8
      )}`;
    }

    // Regex para validar formato DD/MM/AAAA
    const regexData =
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (!regexData.test(dataVar)) return; // Se não estiver no formato correto, retorna

    // Converter para objeto Date
    const [dia, mes, ano] = dataVar.split("/").map(Number);
    const dataNascimento = new Date(ano, mes - 1, dia);
    const hoje = new Date();

    // Verifica se a data realmente existe (ex.: não aceita 31/02/2023)
    if (
      dataNascimento.getDate() !== dia ||
      dataNascimento.getMonth() + 1 !== mes ||
      dataNascimento.getFullYear() !== ano
    ) {
      return;
    }

    // Calcular idade
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    if (
      hoje.getMonth() < dataNascimento.getMonth() ||
      (hoje.getMonth() === dataNascimento.getMonth() &&
        hoje.getDate() < dataNascimento.getDate())
    ) {
      idade--;
      setIdade(idade);
      setDataNascVerify(true);
      console.log(idade);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Cadastrar no <Text style={{ color: "#075eec" }}>MobCocais</Text>
          </Text>

          <Text style={styles.subtitle}>
            Preencha seus dados para se cadastrar no app
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Nome Completo</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="name-phone-pad"
              //   onChangeText={email => setForm({ ...form, email })}
              placeholder="ex: Tauan Freire dos Santos"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              onChange={(e) => verificarName(e)}
            />

            {name.length < 1 ? null : nameVerify ? null : (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                O nome não ter menos que 2 caracteres
              </Text>
            )}
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              //   onChangeText={email => setForm({ ...form, email })}
              placeholder="ex: mobcocais@gmail.com"
              placeholderTextColor="#6b7280"
              onChange={(e) => verificarEmail(e)}
              style={styles.inputControl}
            />

            {email.length < 1 ? null : emailVerify ? null : (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Verifique seu email
              </Text>
            )}

            {/* {email.length < 1 ? null : nameVerify ? null : (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Verifique seu endereço de email
              </Text>
            )} */}
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>CPF</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              // keyboardType="numeric"
              //   onChangeText={email => setForm({ ...form, email })}
              placeholder="ex: 999.999.999-99"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              onChange={(e) => verificarCPF(e)}
            />

            {cpf.length < 1 ? null : cpfVerify ? null : (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                CPF inválido
              </Text>
            )}
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Data de Nascimento</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              // keyboardType="numeric"
              //   onChangeText={email => setForm({ ...form, email })}
              placeholder="ex: 01/01/2001"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              onChange={(e) => verificarDataNascimento(e)}
            />

            {dataNasc.length < 1 ? null : dataNascVerify ? null : (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Data de Nascimento inválida
              </Text>
            )}
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Número de Telefone</Text>

            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              // keyboardType="numeric"
              //   onChangeText={password => setForm({ ...form, password })}
              placeholder="ex: 98 981552475"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              onChange={(e) => {
                verificarNumeroTelefone(e);
              }}
            />

            {numberPhone < 1 ? null : numberPhoneVerify ? null : (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Número inválido
              </Text>
            )}
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                if (
                  nameVerify == false ||
                  emailVerify == false ||
                  cpfVerify == false ||
                  dataNascVerify == false ||
                  numberPhone == false
                ) {
                  alert("Preencha todos os dados");
                } else if (idade < 18) {
                  alert(
                    "Você não pode ter acesso ao MobCocais, você é menor de idade"
                  );
                } else {
                  // console.log(name);
                  // console.log(cpf);
                  // console.log(dataNasc);
                  // console.log(email);
                  // console.log(numberPhone);
                  createUser()
                  // navigation.navigate("CriarSenha");
                }
                // navigation.navigate("CriarSenha");
                navigation.navigate("CriarSenha", { name, cpf, email, dataNasc, numberPhone });
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Continuar</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.formLink}>Já tem uma conta? Faça o login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      {/* <TouchableOpacity
        onPress={() => {
          // handle link
        }}>
        <Text style={styles.formFooter}>
          Já tem uma conta?{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Faça o login</Text>
        </Text>
      </TouchableOpacity> */}
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
});
