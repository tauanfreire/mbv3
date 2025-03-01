// import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importação das telas
import Home from "../screens/home/Home";
import Login from "../screens/login/Login";
import Cadastrar from "../screens/registers/cadastrarUser/CadastrarUser";
import Senha from "../screens/registers/cadastrarSenha/CadastrarSenha";
import CadastrarCartao from "../screens/registers/cadastrarCartao/CadastrarCartao";
import CadastrarCarro from "../screens/registers/cadastrarCarro/CadastrarCarro";
import MapaScreen from "../screens/mapBackScreen/Mapa";
import SelecionarTipoUsuario from "../screens/selecionarTipoUsuario/SelecionarTipoUsuario";
// import Main from "./../routes/Main";
import TabComponent from "./tab";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Criando o Stack Navigator
const Stack = createNativeStackNavigator();


export default function StackComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        //   initialRouteName="Login"
        //   // sho
        screenOptions={{
          headerShown: false,
          //     // headerStyle: { backgroundColor: '#1E90FF' }, // Cor da barra superior
          //     // headerTintColor: '#fff', // Cor do texto do título
          //     // headerTitleAlign: 'center', // Centralizar o título
          //     // headerTitleStyle: { fontSize: 20 }, // Estilização do título
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Início" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Cadastrar"
          component={Cadastrar}
          options={{ title: "Cadastro" }}
        />
        <Stack.Screen
          name="CriarSenha"
          component={Senha}
          options={{ title: "Criar Senha" }}
        />
        <Stack.Screen
          name="TipoUsuario"
          component={SelecionarTipoUsuario}
          options={{ title: "Selecione o tipo de Usuário" }}
        />
        <Stack.Screen
          name="CadastrarCartao"
          component={CadastrarCartao}
          options={{ title: "Cadastrar Cartão" }}
        />
        <Stack.Screen
          name="CadastrarCarro"
          component={CadastrarCarro}
          options={{ title: "Cadastrar Carro" }}
        />
        <Stack.Screen name="TabComponent" component={TabComponent} />

        <Stack.Screen name="MapaScreen" component={MapaScreen} />
        {/* <Stack.Screen
          name="Main"
          component={Main}
          options={{ title: "Cadastrar Carro" }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
