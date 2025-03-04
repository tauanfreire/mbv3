import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Fontisto";
import Icon2 from "react-native-vector-icons/Fontisto";
// import { StackTypes } from "../../../routes/stack";

export default function CadastrarCartao() {
  // const navigation = useNavigation();
  // const route = useRoute();
  // const idUser = route.params;
  // const [id, setId] = useState(idUser);
  // const {usuario} = route.params

  const [titular, setTitular] = useState("");
  const [numberCard, setNumberCard] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  const [titularVerify, setTitularVerify] = useState(false);
  const [numberCardVerify, setCardNumberVerify] = useState(false);
  const [validadeVerify, setvalidadeVerify] = useState(false);
  const [cvvVerify, setcvvVerify] = useState(false);

  const [bandeiraCartao, setBandeiraCartao] = useState("");

  function verificarTitular(e) {
    const titularVar = e.nativeEvent.text;
    setTitular(titularVar);
    setTitularVerify(titularVar.length > 1);
  }

  function verificarNumeroCartao(e) {
    const numeroInput = e.nativeEvent.text;
    const numeroVar = numeroInput.replace(/\D/g, "");
    setCardNumberVerify(false);

    if (numeroVar.length >= 13 && numeroVar.length <= 19) {
      if (luhnCheck(numeroVar) && verificarBandeira(numeroVar)) {
        console.log("Bandeira: " + verificarBandeira(numeroVar));
        setCardNumberVerify(true);
      }
    }
    setNumberCard(numeroVar);
  }

  function verificarValidade(e) {
    const validadeInput = e.nativeEvent.text; // Obtém o valor do input
    const validadeVar = validadeInput.replace(/\D/g, ""); // Remove caracteres não numéricos
    console.log(validadeInput);
    console.log(validadeVar);
    setvalidadeVerify(false); // Reseta o estado de verificação

    console.log("Validade.length: " + validadeVar.length);

    if (validadeVar.length === 4) {
      const mes = parseInt(validadeVar.substring(0, 2), 10); // Extrai o mês
      const ano = parseInt(validadeVar.substring(2, 4), 10); // Extrai o ano
      const dataAtual = new Date(); // Obtém a data atual
      const dataValidade = new Date(`20${ano}`, mes - 1); // Cria a data de validade

      // Verifica se o mês é válido e se a data de validade é futura
      if (mes >= 1 && mes <= 12 && dataValidade > dataAtual) {
        setvalidadeVerify(true); // Marca como válida
      }
    }
    setValidade(validadeVar); // Atualiza o estado com a validade formatada
  }

  function verificarCvv(e) {
    const cvvInput = e.nativeEvent.text;
    const cvvVar = cvvInput.replace(/\D/g, "");
    if(bandeiraCartao == 'amex'){
      setcvvVerify(cvvVar.length === 4); // Ajuste para 4 se for Amex
    }
    else{
      setcvvVerify(cvvVar.length === 3); // Ajuste para 4 se for Amex
    }
    setCvv(cvvVar);
  }

  function verificarBandeira(numero) {
      const bandeiras = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/, // Visa
        mastercard: /^5[1-5][0-9]{14}$/, // MasterCard
        amex: /^3[47][0-9]{13}$/, // American Express
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/, // Diners Club
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/, // Discover
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/, // JCB
        elo: /^(4011|4312|4389|4514|4576|5041|5067|5090|6504|6516|6517|6550)[0-9]{12,15}$/, // Elo
        hipercard: /^(6062|3841|6370|6375)[0-9]{8,13}$/, // Hipercard
      };

    // Verifica se o número corresponde a alguma bandeira
    for (const [bandeira, regex] of Object.entries(bandeiras)) {
      if (regex.test(numero)) {
        setBandeiraCartao(bandeira);
        return bandeira; // Retorna o nome da bandeira
      }
    }
    return null; // Retorna null se nenhuma bandeira for encontrada
  }

  function luhnCheck(num) {
    let sum = 0;
    let shouldDouble = false;

    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }

  const rotation = useSharedValue(0);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
    backfaceVisibility: "hidden",
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value + 180}deg` }],
    backfaceVisibility: "hidden",
  }));

  const toggleCard = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0, {
      duration: 500,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View
        style={styles.containerScroll}
        extraHeight={150}
        enableOnAndroid={true}
      >
        <View style={styles.main}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Cadastrar <Text style={{ color: "#075eec" }}>Cartão</Text>
            </Text>
            <Text style={styles.subtitle}>
              Cadastre seu cartão para usar o app
            </Text>
          </View>

          <View style={styles.cardWrapper}>
            <Animated.View style={[styles.card, frontStyle]}>
              <View style={styles.top}>
                <View style={[styles.circle, styles.logo]}></View>
                <Text style={styles.label}>MobCocais Card</Text>
              </View>
              <View style={styles.bottom}>
                <Text style={styles.value}>{titular}</Text>
                <View style={styles.bandeiraCartao}>
                    <Icon
                      name="credit-card"
                      size={20}
                      style={{
                        backgroundColor: "pink",
                        color: "#176585",
                        borderWidth: 1,
                        borderColor: "pink",
                      }}
                    />
                </View>
              </View>
            </Animated.View>

            <Animated.View style={[styles.card, backStyle]}>
              <View style={styles.top}>
                <View>
                  <Text style={styles.label}>Número do cartão</Text>
                  <Text style={styles.value}>
                    {numberCard.replace(/(\d{4})(?=\d)/g, "$1 ")}
                  </Text>
                </View>
              </View>
              <View style={styles.bottom}>
                <View>
                  <Text style={styles.label}>Validade</Text>
                  <Text style={styles.value}>
                    {validade.replace(/(\d{2})(?=\d)/g, "$1/")}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>CVV</Text>
                  <Text style={styles.value}>{cvv}</Text>
                </View>
              </View>
            </Animated.View>
          </View>

          <View>
            <TouchableOpacity onPress={toggleCard} style={styles.buttonWrapper}>
              <Text style={styles.btnText}>Virar Cartão</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={titular}
              placeholder="TITULAR DO CARTÃO"
              onFocus={() =>
                (rotation.value = withTiming(0, { duration: 500 }))
              }
              onChange={(e) => verificarTitular(e)}
            />
            {titular.length < 1 ? null : titularVerify ? null : (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Titular não pode ter menos que 2 letras
              </Text>
            )}
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="NÚMERO DO CARTÃO"
              onFocus={() =>
                (rotation.value = withTiming(180, { duration: 500 }))
              }
              onChange={(e) => verificarNumeroCartao(e)}
            />
            {numberCard.length < 1 ? null : numberCardVerify ? null : (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Verifique o número do cartão
              </Text>
            )}
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput, validade.length < 1 ? null : validadeVerify ? null : {borderWidth: 2, borderColor: 'red'}]}
                keyboardType="numeric"
                placeholder="VALIDADE"
                maxLength={4}
                onFocus={() =>
                  (rotation.value = withTiming(180, { duration: 500 }))
                }
                onChange={(e) => verificarValidade(e)}
              />
              <TextInput
                style={[styles.input, styles.halfInput, cvv.length < 1 ? null : cvvVerify ? null : {borderWidth: 2, borderColor: 'red'}]}
                keyboardType="numeric"
                maxLength={bandeiraCartao === "amex" ? 4 : 3}
                placeholder="CVV"
                onFocus={() =>
                  (rotation.value = withTiming(180, { duration: 500 }))
                }
                onChange={(e) => verificarCvv(e)}
              />
            </View>
            <TouchableOpacity
              style={{ marginTop: 50 }}
              onPress={() => {
                console.log("TITULAR: " + titular);
                console.log("NÚMERO: " + numberCard);
                console.log("VALIDADE: " + validade);
                console.log("CVV: " + cvv);
                // navigation.navigate("CadastrarCarro");
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Finalizar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#e8ecf4",
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  containerScroll: {
    paddingVertical: 24,
    flexGrow: 1,
  },
  cardWrapper: {
    marginBottom: 20,
    position: "relative",
    width: "100%",
    height: 200,
  },
  card: {
    backgroundColor: "#176585",
    borderRadius: 12,
    width: "100%",
    height: "100%",
    padding: 24,
    position: "absolute",
    justifyContent: "space-between",
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  top: {
    padding: 10,
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
  },
  label: {
    fontWeight: "bold",
    color: "pink",
  },
  bottom: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bandeiraCartao: {
    flexDirection: "row",
  },
  value: {
    fontWeight: "bold",
    color: "white",
  },
  input: {
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
  form: {
    gap: 5,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  halfInput: {
    width: "48%",
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#075eec",
    backgroundColor: "#075eec",
    marginVertical: 10,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
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
  logo: {
    backgroundColor: "#F0F7DA",
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
});
