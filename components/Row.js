import React from 'react'
import { Pressable, Text, StyleSheet, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Row({ item, selectedId, select, data, setData }) {
  const backgroundColor = item.id === selectedId ? '#f0f0f0' : '#fff'

  const remove = () => {
    const arrayWithoutRemoved = data.filter((item) => item.id !== selectedId)
    setData(arrayWithoutRemoved)
    select(null)
  }

  const markAsDone = () => {
    const updatedData = data.map((task) =>
      task.id === item.id ? { ...task, done: !task.done } : task
    )
    select(item.id)
    setData(updatedData)
  }

  return (
    <Pressable style={[styles.row, { backgroundColor }]} onPress={() => select(item.id)} onLongPress={() => markAsDone()}>

      {item.done ? (
        <>
        <Ionicons name='checkbox-outline' size={24} onPress={() => markAsDone()}/>
        <Text style={styles.lineTroughText}>{item.name}</Text>
        </>

      ) : (
        <>
        <Ionicons name='square-outline' size={24} onPress={() => markAsDone()}/>
        <Text style={styles.rowText}>{item.name}</Text>
        </>
        )}
      {
        item.id === selectedId ? (<Ionicons name='trash' size={24} onPress={() => remove()} />) : (
          <View style={{ width: 24 }} />
        )
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,

  },
  rowText: {
    width: '80%',
    fontSize: 16,
    padding: 4,
    margin: 4,
  },
  lineTroughText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    width: '80%',
    fontSize: 16,
    padding: 4,
    margin: 4,
  }
})