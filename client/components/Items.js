import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
export default function Item({ item, navigation, load_collections}) {
  var { name, description, _id } = item;
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewItem", { _id,load_collections})}
        style={styles.item}
      >
        <View style={styles.image}></View>
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.desc}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    // flex:1,
    marginTop: 5,
    marginBottom: 5,
    // padding: 20,
    display: "flex",
    flexDirection:"row",
    // justifyContent: "space-between",
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '95%',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.6,
    elevation: 5,
    shadowOffset:50,
    marginLeft:"auto",
    marginRight:"auto",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  desc: {
    fontWeight: "300",
  },
  num: {
    color: "rgba(0,0,0,.3)",
  },
  image: {
    backgroundColor: "black",
    height: 50,
    width: 50,
    borderRadius:50
  },
  content: {
    marginLeft:10,
  },
});
