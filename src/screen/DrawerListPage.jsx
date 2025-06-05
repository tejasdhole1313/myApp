import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native';

const drawerItems = [
  "CLOTHES",
  "SPORT",
  "ACCESSORIES",
  "SWIMWEAR & BEACHWEAR",
  "SHOES"
];

export default function DrawerListPage() {
  const navigation = useNavigation();
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleItemPress = (idx) => {
    if (selectedIdx === idx) {
      setSelectedIdx(null); 
    } else {
      setSelectedIdx(idx); 
    }
  };

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name={'cross'} size={24}/>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('LadiesPage')}>
            <Text>Ladies</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MenPage')}>
            <Text>Men</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('KidsPage')}>
            <Text>Kids</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HOME')}>
            <Text>Home</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleHeader}>
          {drawerItems.map((item, idx) => (
            <TouchableOpacity key={item} onPress={() => handleItemPress(idx)}>
              <Text
                style={[
                  styles.text,
                  selectedIdx === idx && { color: '#E96E6E', fontWeight: 'bold' }
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, },
  headerContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  titleHeader:{
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 20,
  
   
    gap:10,
  },
  text: {
    fontSize: 15,
    color: '#333'
  }
});