import { SafeAreaView } from 'react-native';
import BottomBar from '../components/bottomBar';
import { COLORS } from "../../assets/theme";


export default function HomePage({navigation}) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
          <BottomBar navigation={navigation}/>
      </SafeAreaView>
    )
}
