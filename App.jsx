import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  // Image,
} from 'react-native';
import TaskContainer from '../todo/components/taskContainer.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AntDesign from 'react-native-vector-icons/AntDesign.js';

const App = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      console.log('false geldi');
      retrieveData();
      setReady(true);
    } else {
      console.log('true oldu');
    }
  }, [ready]);

  const handleAddTask = () => {
    // setTaskItems([...taskItems, task]);

    storeData();

    setTask(null);
  };

  const completeTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    AsyncStorage.setItem('todo', JSON.stringify(itemsCopy)).then(() => {
      setTaskItems(itemsCopy);
    });
  };

  const storeData = async () => {
    try {
      taskItems.push(task);
      const stringfyTasks = JSON.stringify(taskItems);
      await AsyncStorage.setItem('todo', stringfyTasks);
    } catch (error) {
      // Error saving data
    }
  };
  const retrieveData = async () => {
    AsyncStorage.getItem('todo')
      .then(data => {
        if (data != null) {
          setTaskItems(JSON.parse(data));
        }
      })
      .catch(error => {
        console.log('Hataa:' + error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.taskTitle}>Today's Task</Text>
        <ScrollView style={styles.body}>
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                disabled={true}
                onPress={() => {
                  null;
                }}>
                <TaskContainer
                  title={item}
                  index={index + 1}
                  func={() => {
                    completeTask(index);
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        style={styles.keyboard}>
        <TextInput
          placeholder="Write a Task"
          style={styles.input}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleAddTask();
          }}>
          <View style={styles.addButton}>
            <Text style={styles.addIcon}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  body: {
    height: '100%',
  },
  taskWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20,
  },
  keyboard: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 60,
    width: '100%',
    position: 'absolute',
    bottom: 60,
  },
  input: {
    padding: 15,
    width: 250,
    backgroundColor: '#fff',
    borderColor: '#c0c0c0',
    borderRadius: 60,
    borderWidth: 1,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  addIcon: {
    color: '#C0C0C0',
    fontSize: 21,
  },
});

export default App;
