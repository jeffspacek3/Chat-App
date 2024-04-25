import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

const CustomActions = ({ db }) => {
  const [] = useState([]);
  return (
    <View style={StyleSheet.container}>
      FlatList data={lists}
      renderItem=
      {({ item }) => (
        <Text>
          {item.name}: {item.items.join(", ")}
        </Text>
      )}
    </View>
  );
};
  const styles = StyleSheet.create({
    container: {
        felx: 1
    }

  })


export default CustomActions;
