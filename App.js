import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomBar from './components/bottomBar';
import Filters from './components/filters';
import Slider from './components/slider';


export default function App() {
  return (
    <View>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <Slider minPrice={1} maxPrice={100} title={"Price"}/> */}
      <Filters/>
      {/* <BottomBar/> */}
      <BottomBar/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
