import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native"; // Importando o hook de navegação
import "react-native-get-random-values";
// import { StackTypes } from "../../routes/stack";

const KEY = "AIzaSyCG5Vk7f38ESS4x3BN1ezz0oJJP08rAkCM"; // Substitua pela sua chave de API

export default function Rotas() {
  const [origem, setOrigem] = useState("")
  const [destino, setDestino] = useState("")
  // const [origin, setOrigin] = useState<string | null>(null);
  // const [destination, setDestination] = useState<string | null>(null);

  const navigation = useNavigation(); // Hook de navegação

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Escolha as <Text style={{ color: "#075eec" }}>Rotas</Text>
        </Text>
        <Text style={styles.subtitle}>Digite a origem e o destino</Text>
      </View>

      <GooglePlacesAutocomplete
        placeholder="Local de Partida"
        onPress={(data) => {
          setOrigem(data.description)
          console.log(data.description)
        }}
        query={{
          key: KEY,
          language: "pt-BR",
        }}
        styles={autoCompleteStyles}
      />

      <GooglePlacesAutocomplete
        placeholder="Destino"
        onPress={(data) => {
          setDestino(data.description)
          console.log(data.description)
        }}
        query={{
          key: KEY,
          language: "pt-BR",
        }}
        styles={autoCompleteStyles}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          console.log(origem, destino); // Verifique se os valores estão aparecendo no console
          navigation.navigate("MapaScreen", { origem, destino });
          // navigation.navigate("MapaScreen", {origem: "Buriti", destino: "Coelho NEto"});
        }}
      >
        <Text style={styles.btnText}>BUSCAR VIAGEM</Text>
        {
          // if(origem == false !! origem !! undefie)
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8ecf4",
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
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
    marginTop: 10
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
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
    marginTop: "30%",
  },
});

const autoCompleteStyles = {
  container: { flex: 0, width: "100%" },
  textInput: { height: 50, fontSize: 16 },
};
