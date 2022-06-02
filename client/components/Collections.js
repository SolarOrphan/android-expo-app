import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {React, useState,useEffect} from 'react'
export default function Collection({ collection, navigation,load_collections }) {
  var { name, description, item_ids, _id } = collection;

  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewCollection", {_id, load_collections, collection})}
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{description}</Text>
        <Text style={styles.num}>
          No. of items : {item_ids ? item_ids.length : 0}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    // flex:1,
    // borderWidth:1,
    // height: 80,
    marginTop: 5,
    marginBottom: 5,
    // padding: 20,
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '80%',
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
});
