import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Ecommerce/src/components/Header';

const SinglePageAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dummyUser = {
    name: 'Tejas Sharma',
    email: 'tejas@example.com',
    password: '123456',
    profileImage: 'https://i.pravatar.cc/150?img=3',
  };

  const handleLogin = () => {
    if (email === dummyUser.email && password === dummyUser.password) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSignup = () => {
    alert('Signup successful (dummy)!');
    setIsSignup(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
      <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
  <View style={styles.headercontainer}>
    <Header isCart={true} />
  </View>
        {!isLoggedIn ? (
        <View style={styles.authBox}>
          <Text style={styles.title}>{isSignup ? 'Sign Up' : 'Login'}</Text>

          {isSignup && (
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          )}

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            onPress={isSignup ? handleSignup : handleLogin}
          >
            <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
            <Text style={styles.linkText}>
              {isSignup ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.profileContainer}>
          <Image source={{ uri: dummyUser.profileImage }} style={styles.profileImage} />
          <Text style={styles.name}>{dummyUser.name}</Text>
          <Text style={styles.email}>{dummyUser.email}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
  </LinearGradient>
   
  );
};

export default SinglePageAuth;

const styles = StyleSheet.create({
 headercontainer:{
    marginBottom:20,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  authBox: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#E96E6E',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#007AFF',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
});
