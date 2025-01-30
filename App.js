import Row from './components/Row';
import { useCallback, useState, useEffect } from 'react';
import { FlatList, SafeAreaView,  StyleSheet, Text,  View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants'
import uuid from 'react-native-uuid'
import Add from './components/Add';

export default function App() {
  
  const [data, setData] = useState([])
  const [selectedId, setSelectedId] = useState(null)

   useEffect(() => {
    getData()
   }, [])

   useEffect(() => {
    storeData();
  }, [data])
   
  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(data)
      await AsyncStorage.setItem('todoData', jsonValue)
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('todoData')
      if (value !== null){
        setData(JSON.parse(value))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const add = useCallback((name) => {
    setData((prevData) => [
      ...prevData,
      { id: uuid.v4(), name, done: false }
    ]);
  }, []);
  

  const select = useCallback((id) => {
    setSelectedId(id);
  }, []);
  

  return (

    <View style={styles.container}>

      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Todo list</Text>
        <Add add={add}/>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Row item={item}
            selectedId={selectedId}
            select={select}
            data={data}
            setData={setData}/>
          )}
        >
        </FlatList>
      </SafeAreaView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.StatusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    margin: 6
  },
  input: {
    borderWidth: 1,
    justifyContent: 'center',
    flex: 1
  },
  header:{
    fontSize: 28,
    paddingTop: 32
  },
  rowText: {
    fontSize: 16,
    marginLeft: 16,
    padding: 1
  }
});
