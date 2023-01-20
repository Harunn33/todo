import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const TaskContainer = props => {
  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskContainerLeft}>
        <Text style={styles.leading}>{props.index}. </Text>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <TouchableOpacity onPress={props.func}>
        <Image
          style={styles.trash}
          source={require('../assets/trash-outline.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskContainerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
  leading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  trash: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
  },
});

export default TaskContainer;
