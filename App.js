import Row from './components/Row';
import { useCallback, useState } from 'react';
import { FlatList, SafeAreaView,  StyleSheet, Text,  View } from 'react-native';
import Constants from 'expo-constants'
import uuid from 'react-native-uuid'
import Add from './components/Add';

export default function App() {
  
  const [data, setData] = useState([])
  const [selectedId, setSelectedId] = useState(null)


  const add = useCallback((name) => {
    const newItem = {
      id: uuid.v4(),
      name: name,
      done: false
    }
    const tempData = [...data, newItem]
    setData(tempData)
  }, [data])

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
