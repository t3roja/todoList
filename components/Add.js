import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button } from 'react-native'
import Constants from 'expo-constants'


export default function Add({add}) {

    const [name, setName] = useState('')

      const save = () => {
        add(name)
        setName('')
      }

    return (
        <View style={styles.container}>
            <TextInput style={styles.form} value={name} onChangeText={text => setName(text)} placeholder='Item name...' />
            <Button title='Save' onPress={() => save(name)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    form:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center,'
    }
})