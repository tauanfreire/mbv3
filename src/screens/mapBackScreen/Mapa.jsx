import React, { useState, useContext, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import type { GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";
import { LocationUserContext } from "../../Context/LocationUserContext";


const API_KEY = "AIzaSyCG5Vk7f38ESS4x3BN1ezz0oJJP08rAkCM";
Geocoder.init(API_KEY);

export default function Mapa() {
  const autoCompleteRef = useRef(null);
  const route = useRoute();
  const { origem, destino } = route.params;
  const [origemAtual, setOrigemAtual] = useState(origem);
  const [destinoAtual, setDestinoAtual] = useState(destino);
  const locationContext = useContext(LocationUserContext);
  if (!locationContext || !locationContext.location) {
    return (
      <View style={styles.alerta}>
        <Text style={styles.textAlerta}>Aguardando localização...</Text>
      </View>
    );
  }

  const { location } = locationContext;
  const [origemCoord, setOrigemCoord] = useState(null);
  const [destinoCoord, setDestinoCoord] = useState(null);
  const [distancia, setDistancia] = useState();
  const [duracao, setDuracao] = useState();

  const [focusOrigem, setFocusOrigem] = useState(false); // Estado para controlar visibilidade do campo Origem
  const [focusDestino, setFocusDestino] = useState(false); // Estado para controlar visibilidade do campo Destino

  const formatarDinheiro = (valor) => {
    return `R$ ${parseFloat(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatarKm = (km) => {
    return `${parseFloat(km).toLocaleString("pt-BR")} KM`;
  };

  const formatarHoras = (horaDecimal) => {
    const horas = Math.floor(horaDecimal);
    const minutos = Math.round((horaDecimal - horas) * 60);
    return `${horas}h ${minutos}m`;
  };

  useEffect(() => {
    const buscarCoordenadas = async () => {
      try {
        const respostaOrigem = await Geocoder.from(origemAtual);
        const { lat: origemLat, lng: origemLng } = respostaOrigem.results[0].geometry.location;
        setOrigemCoord({ latitude: origemLat, longitude: origemLng });

        const respostaDestino = await Geocoder.from(destinoAtual);
        const { lat: destinoLat, lng: destinoLng } = respostaDestino.results[0].geometry.location;
        setDestinoCoord({ latitude: destinoLat, longitude: destinoLng });
      } catch (error) {
        console.error("Erro ao buscar coordenadas:", error);
      }
    };

    buscarCoordenadas();
  }, [origemAtual, destinoAtual]);

  if (!origemCoord || !destinoCoord) {
    return (
      <View style={styles.alerta}>
        <Text style={styles.textAlerta}>Aguardando coordenadas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, StyleSheet.absoluteFillObject]}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={{
          latitude: origemCoord.latitude,
          longitude: origemCoord.longitude,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
        }}
      >
        <Marker title="Origem" coordinate={origemCoord} />
        <Marker title="Destino" coordinate={destinoCoord} />
        <MapViewDirections
          origin={origemCoord}
          destination={destinoCoord}
          apikey={API_KEY}
          strokeWidth={8}
          strokeColor="blue"
          onReady={(result) => {
            setDistancia(result.distance.toFixed(0));
            setDuracao((result.duration / 60).toFixed(2));
          }}
        />
      </MapView>
      <View style={styles.tudo}>
        <View style={styles.top}>
          <View style={{width: "80%", height: 200, margin: "auto", opacity: 0.9}}> 
  

            <GooglePlacesAutocomplete
              style={{backgroundColor: "blue"}}
              placeholder={origemAtual}
              ref={autoCompleteRef}
              onPress={(data) => {
                setOrigemAtual(data.description);
             
                // setShowDestino(true); // Mostra o destino ao selecionar origem
              }}
              query={{
                key: API_KEY,
                language: "pt-BR",
              }}
            />
            <GooglePlacesAutocomplete
              placeholder={destinoAtual}
              onPress={(data) => {
                setDestinoAtual(data.description);
                // setShowOrigem(true); // Mostra a origem ao selecionar destino
              }}
              query={{
                key: API_KEY,
                language: "pt-BR",
              }}
            />
          </View>

          <View style={{width: "80%"}}>
            
          </View>



        </View>
        <View style={styles.bottom}>
          <View style={styles.caixaPreco}>
            <View style={styles.plano}>
              <Text style={styles.planoName}>Dados da Corrida</Text>
            </View>
            <View style={styles.informacoes}>
              <View style={styles.dados}>
                <Text style={styles.textos}>{formatarDinheiro(2 * distancia)}</Text>
              </View>
              <Text style={styles.barra}>|</Text>
              <View style={styles.dados}>
                <Text style={styles.textos}>{formatarKm(distancia)}</Text>
              </View>
              <Text style={styles.barra}>|</Text>
              <View style={styles.dados}>
                <Text style={styles.textos}>{formatarHoras(duracao)}</Text>
              </View>
            </View>
            <View style={styles.chamarCorrida}>
              <TouchableOpacity style={styles.solicitarButton}>
                <Text style={styles.solicitarText}> Solicitar Corrida</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  alerta: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textAlerta: {
    fontSize: 30,
    color: "red",
    fontWeight: "bold",
  },
  caixaPreco: {
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    elevation: 20,
    alignItems: "center",
    gap: 10,
  },
  informacoes: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  plano: {
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  textos: {
    fontSize: 17,
    fontWeight: "bold",
  },
  chamarCorrida: {
    width: "100%",
  },
  solicitarButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 7,
    backgroundColor: "#075eec",
    borderRadius: 7,
  },
  solicitarText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  barra: {
    color: "gray",
  },
  tudo: {
    flex: 1,
    justifyContent: "space-between",
    // backgroundColor: "blue",
  },
  top: {
    // backgroundColor: "red", 
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50, // Apenas para visualização
    width: "90%",
    margin: "auto",
    // height: 200
    // marginTop: 20, // Adicionando um espaço entre o topo da tela
  },
  
});

const autoCompleteStyles = {
  backgroundColor: "blue",
  // container: { flex: 0, width: "100%" },
  // textInput: { height: 50, fontSize: 16 },
};
