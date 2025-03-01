import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function SelecionarTipoUsuario() {
  const [isMotorista, setIsMotorista] = useState(true);
  const [isPassageiro, setIsPassageiro] = useState(false);

  useEffect(() => {
    console.log("Estado atualizado:");
    console.log("isMotorista:", isMotorista);
    console.log("isPassageiro:", isPassageiro);
    console.log("_____________________________________");
  }, [isMotorista, isPassageiro]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Selecionar categoria no{" "}
          <Text style={{ color: "#075eec" }}>MobCocais</Text>
        </Text>
        <Text style={styles.subtitle}>Como você deseja se cadastrar?</Text>
      </View>

      <View style={styles.conteudo}>
        <View style={styles.view}>
          <TouchableOpacity
            onPress={() => {
              setIsMotorista(true);
              setIsPassageiro(false);
            }}
            style={[
              styles.button,
              {
                backgroundColor: isMotorista ? "#63C5DA" : "#A5B3AA",
                opacity: isMotorista ? 0.6 : 1,
              },
            ]}
          >
            <Text style={styles.text}>MOTORISTA</Text>
            {isMotorista && (
              <View style={styles.icon}>
                <Icon name="check-circle" size={30} color="green" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.view}>
          <TouchableOpacity
            onPress={() => {
              setIsPassageiro(true);
              setIsMotorista(false);
            }}
            style={[
              styles.button,
              {
                backgroundColor: isPassageiro ? "#63C5DA" : "#A5B3AA",
                opacity: isPassageiro ? 0.6 : 1,
              },
            ]}
          >
            <Text style={styles.text}>PASSAGEIRO</Text>
            {isPassageiro && (
              <View style={styles.icon}>
                <Icon name="check-circle" size={30} color="green" />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formV}>
        <View style={styles.form}>
          <View style={styles.input}></View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                cadastrarSenha();
                navigation.navigate("CadastrarCartao", { usuario });
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
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  conteudo: {
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 300,
    height: 150,
    position: "relative",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 10,
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

