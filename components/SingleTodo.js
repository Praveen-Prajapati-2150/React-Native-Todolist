import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SingleTodo({ todo, setTodos, todos }) {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (!edit) {
      setEdit(!edit);
    } else {
      setEdit(!edit);
      setTodos(
        todos.map((t) =>
          t.id === todo.id
            ? {
                id: t.id,
                text: editText,
              }
            : t
        )
      );
      //   AsyncStorage.setItem('todos', JSON.stringify(todos));
    }
  };

  const handleDelete = () => {
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <View style={styles.todo}>
      {!edit ? (
        <Text style={styles.todoText}>{todo.text}</Text>
      ) : (
        <TextInput
          style={styles.todoInput}
          onChangeText={(text) => setEditText(text)}
          value={editText}
        />
      )}

      <TouchableOpacity>
        <MaterialIcons
          style={styles.todoAction}
          name="mode-edit"
          size={24}
          color="black"
          onPress={handleEdit}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign
          style={styles.todoAction}
          name="delete"
          size={24}
          color="black"
          onPress={handleDelete}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: 'black',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  todoAction: {
    marginLeft: 15,
  },
  todoInput: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
  },
});
