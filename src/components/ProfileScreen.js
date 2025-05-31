import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/authSlice';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); 
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth?.isLoggedIn;

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Profile</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image source={require('../assets/profile.png')} style={styles.dp} />
          {isLoggedIn ? (
            <TouchableOpacity style={styles.loginBtn} onPress={() => dispatch(logout())}>
              <Text style={styles.loginText}>LOG OUT</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => navigation.navigate('Contact')}
            >
              <Text style={styles.loginText}>SIGN IN/CREATE ACOUNT?</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Options List */}
        <View style={styles.optionList}>
          <Option icon="inventory" label="Orders" subtext="Check your order status" />
          <Option icon="support-agent" label="Help Center" subtext="Help regarding your recent purchases" />
          <Option icon="favorite-border" label="Wishlist" subtext="Your most loved styles" />
        </View>

        {/* Footer Links */}
        {/* <View style={styles.footerLinks}>
          {['FAQs', 'ABOUT US', 'TERMS OF USE', 'PRIVACY POLICY', 'GRIEVANCE REDRESSAL'].map((text) => (
            <Text key={text} style={styles.footerText}>{text}</Text>
          ))}
        </View> */}
      </ScrollView>
    </LinearGradient>
  );
};

const Option = ({ icon, label, subtext }) => (
  <TouchableOpacity style={styles.option}>
    <View style={styles.optionLeft}>
      <Icon name={icon} size={24} color="#555" />
      <View style={styles.optionText}>
        <Text style={styles.optionTitle}>{label}</Text>
        <Text style={styles.optionSub}>{subtext}</Text>
      </View>
    </View>
    <AntDesign name="right" size={16} color="#E96E6E" />
  </TouchableOpacity>
);





const styles = StyleSheet.create({
  container: {
   
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  dp: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  loginBtn: {
    backgroundColor: '#E96E6E',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  optionList: {
    paddingVertical: 30
    ,
  },
  option: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
  },
  optionTitle: {
    fontWeight: '600',
  },
  optionSub: {
    color: '#777',
    fontSize: 12,
  },
  footerLinks: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  footerText: {
    marginVertical: 8,
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
});

export default ProfileScreen;
