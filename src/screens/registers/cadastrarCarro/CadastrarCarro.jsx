import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CarsData from "./CarsData"

export default function Cadastrar() {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [plate, setPlate] = useState('');

  // Obter os modelos e anos com base na fabricante selecionada
// Obter os modelos e anos com base na fabricante selecionada
const modelsAndYears = selectedManufacturer && CarsData[selectedManufacturer] ? CarsData[selectedManufacturer].models : [];
const colors = selectedManufacturer && CarsData[selectedManufacturer] ? CarsData[selectedManufacturer].colors : [];


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Cadastrar <Text style={{ color: '#075eec' }}>Carro</Text></Text>
          <Text style={styles.subtitle}>Preencha os dados do seu carro</Text>
        </View>

        <View style={styles.form}>

          {/* Dropdown Fabricante */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Fabricante</Text>
            <Picker
              selectedValue={selectedManufacturer}
              onValueChange={(itemValue) => {
                setSelectedManufacturer(itemValue);
                setSelectedModel('');  // Reset model when manufacturer changes
                setSelectedYear('');
                setSelectedColor('');
              }}
              style={styles.inputControl}
            >
              <Picker.Item label="Selecione a fabricante" value="" />
              {Object.keys(CarsData).map((manufacturer) => (
                <Picker.Item key={manufacturer} label={manufacturer} value={manufacturer} />
              ))}
            </Picker>
          </View>

          {/* Dropdown Modelo */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Modelo</Text>
            <Picker
              selectedValue={selectedModel}
              onValueChange={(itemValue) => {
                setSelectedModel(itemValue);
                setSelectedYear('');
              }}
              style={styles.inputControl}
              enabled={selectedManufacturer !== ''}
            >
              <Picker.Item label="Selecione o modelo" value="" />
              {modelsAndYears.length > 0 && modelsAndYears.map((model, index) => (
                <Picker.Item key={index} label={model.name} value={model.name} />
              ))}
            </Picker>
          </View>

          {/* Dropdown Ano */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Ano</Text>
            <Picker
              selectedValue={selectedYear}
              onValueChange={setSelectedYear}
              style={styles.inputControl}
              enabled={selectedModel !== ''}
            >
              <Picker.Item label="Selecione o ano" value="" />
              {modelsAndYears.find(model => model.name === selectedModel)?.years.map((year, index) => (
                <Picker.Item key={index} label={year} value={year} />
              ))}
            </Picker>
          </View>

          {/* Dropdown Cor */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Cor</Text>
            <Picker
              selectedValue={selectedColor}
              onValueChange={setSelectedColor}
              style={styles.inputControl}
              enabled={selectedYear !== ''}
            >
              <Picker.Item label="Selecione a cor" value="" />
              {colors.length > 0 && colors.map((color, index) => (
                <Picker.Item key={index} label={color} value={color} />
              ))}
            </Picker>
          </View>

          {/* Input Placa */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Placa</Text>
            <TextInput
              value={plate}
              onChangeText={setPlate}
              style={styles.inputControl}
              placeholder="Ex: ABC-1234"
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle form submission
            }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Cadastrar Carro</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
