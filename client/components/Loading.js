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
    left:0,
    right:0,
    zIndex:1,
    backgroundColor:"transparent",
    height:"100%",
    width:"100%",
    // margin:0,
  },
  loadhorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Loading;
