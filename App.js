import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import { icon } from './assets/favicon.png';
import SingleTodo from './components/SingleTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (!todo) return;

    setTodos([...todos, { id: Date.now(), text: todo }]);
    setTodo('');
  };

  const fetchTodos = async () => {
    console.log('fetch todos');
    const data = await AsyncStorage.getItem('todos');
    if (data) setTodos(JSON.parse(data));
  };

  useEffect(() => {
    fetchTodos();
    console.log('useeffect');
  }, []);

  console.log(todos);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>React Native Tutorial</Text>
      <Text style={styles.heading}>{todo}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={todo}
          onChangeText={(text) => setTodo(text)}
          placeholder="Enter a Todo"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddTodo}>
          <Text style={styles.button}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* <ScrollView>
        {todos.map((todo) => (
          <Text key={todo.id}>{todo.text}</Text>
        ))}
      </ScrollView> */}

      <View style={{ width: '100%', marginTop: 10 }}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <SingleTodo todos={todos} todo={item} setTodos={setTodos} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: '700',
  },
  button: {
    padding: 13,
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 10,
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
});

// const App = () => {
//   return (
//     <View>
//       <Text style={styles.textStyles}>Hello World</Text>
//       <Image source={icon} style={{ width: 305, height: 150 }} />
//       <Image
//         source={{
//           uri: 'https://media.gettyimages.com/photos/india-gate-new-delhi-picture-id481632685?k=20&m=481632685&s=612x612&w=0&h=HLn7PaQ-ct1DDRnrd_u-qRwLZ_yomkwiNEamlnX7Yvk=',
//         }}
//         style={{ width: 305, height: 150 }}
//       />
//       <TouchableOpacity activeOpacity={0.5}>
//         <Text>Press Me</Text>
//       </TouchableOpacity>

//       <Text>hello </Text>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   textStyles: {
//     marginTop: 50,
//   },
// });
