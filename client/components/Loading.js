import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = () => (
  <View style={[styles.loadcontainer, styles.loadhorizontal]}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  loadcontainer: {
    position:"absolute",
    zIndex:1,
    backgroundColor:"rgba(255,255,255,.8)",
    height:"100%",
    width:"100%",
    margin:0,
  },
  loadhorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Loading;
