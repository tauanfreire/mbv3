import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
// import { StackTypes } from "../../../routes/stack";

export default function CadastrarCartao() {
  const navigation = useNavigation();
  const [titular, setTitular] = useState("");
  const [numberCard, setNumberCard] = useState("");
  const [validaade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  const rotation = useSharedValue(0);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
    backfaceVisibility: "hidden",
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value + 180}deg` }],
    backfaceVisibility: "hidden",
  }));

  const handleCardNumberChange = (text) => {
    let formattedText = text.replace(/\D/g, "").substring(0, 16);
    formattedText = formattedText.replace(/(\d{4})(?=\d)/g, "$1 ");
    setNumberCard(formattedText);
  };

  const handleValidadeChange = (text) => {
    let formattedText = text.replace(/\D/g, "").substring(0, 4);
    formattedText = formattedText.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    setValidade(formattedText);
  };

  const handleCVVChange = (text) => {
    let formattedText = text.replace(/\D/g, "").substring(0, 3);
    setCvv(formattedText);
  };

  const toggleCard = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0, {
      duration: 500,
    });
  };

  const handleTitularChange = (text) => {
    setTitular(text);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <KeyboardAwareScrollView
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
                  <View style={[styles.circle, styles.red]}></View>
                  <View style={[styles.circle, styles.orange]}></View>
                </View>
              </View>
            </Animated.View>

            <Animated.View style={[styles.card, backStyle]}>
              <View style={styles.top}>
                <View>
                  <Text style={styles.label}>Número do cartão</Text>
                  <Text style={styles.value}>{numberCard}</Text>
                </View>
              </View>
              <View style={styles.bottom}>
                <View>
                  <Text style={styles.label}>Validade</Text>
                  <Text style={styles.value}>{validaade}</Text>
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
              onChangeText={handleTitularChange}
              placeholder="TITULAR DO CARTÃO"
              onFocus={() =>
                (rotation.value = withTiming(0, { duration: 500 }))
              }
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleCardNumberChange}
              value={numberCard}
              placeholder="NÚMERO DO CARTÃO"
              onFocus={() =>
                (rotation.value = withTiming(180, { duration: 500 }))
              }
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                keyboardType="numeric"
                onChangeText={handleValidadeChange}
                value={validaade}
                placeholder="VALIDADE"
                onFocus={() =>
                  (rotation.value = withTiming(180, { duration: 500 }))
                }
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                keyboardType="numeric"
                onChangeText={handleCVVChange}
                value={cvv}
                maxLength={3}
                placeholder="CVV"
                onFocus={() =>
                  (rotation.value = withTiming(180, { duration: 500 }))
                }
              />
            </View>
            <TouchableOpacity
              style={{ marginTop: 50 }}
              onPress={() => {
                navigation.navigate("CadastrarCarro");
              }}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Finalizar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
    // margin: 60,
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
  red: {
    backgroundColor: "red",
  },
  orange: {
    backgroundColor: "orange",
    marginLeft: -8,
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
