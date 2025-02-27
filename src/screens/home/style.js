import {StyleSheet} from "react-native"


export const styles = StyleSheet.create({
    container:{
        flex: 1,
        // backgroundColor: "black"
    },
    image:{
        flex: 1,
        // backgroundColor: "#e8ecf4"
        backgroundColor: "white",
        
        // opacity: 0.1
    },
    btnV:{
        gap: 5,
        marginBottom: "15%",
        width: "70%",
        
    },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#075eec",
        backgroundColor: "#075eec",
        // marginVertical: 10, // Espaçamento para evitar o botão grudado
      },
    // btn:{
    //     width: "100%",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "#176585",
    //     color: "black",
    //     borderRadius: 5,
    //     padding: 10,

    // },
    textBtn:{
        fontSize: 18,
        // lineHeight: 26,
        fontWeight: "600",
        color: "#fff",
    },
    conteudo:{
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1
    },
    titleV:{
        marginTop: "30%",
        alignItems: "center",
        justifyContent: "center",
    },
    // title:{
    //     alignItems: "center",
    //     justifyContent: "center",
    //     fontWeight: "bold",
    //     color: "#176585",
    //     fontSize: 30
    // },
    googleBtn:{
        borderWidth: 1,
        borderColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        padding: 9,
        borderRadius: 5
    },
    textBtnGoogle:{
        fontWeight: "bold"
    },
    googleBtnV:{
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    title: {
        fontSize: 29,
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
        marginTop: 100,
      },
})