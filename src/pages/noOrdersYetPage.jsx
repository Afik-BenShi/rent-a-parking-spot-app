import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
} from 'react-native';

export default function NoOrdersYet() {

  // const [myOrders, setMyOrders] = useState([]);
  // const [userId, setUserId] = useState(route.params.userId);

  // const [noContent, setNoContent] = useState(true);

  // const fetchMyOrderAsRenter = async () => {
  //     try {
  //         const response = await axios.get(`http://${config.serverIp}:${config.port}/orders/renter/${userId}?time=all`);
  //         setMyOrders(response.data);
          
  //         console.log("myOrders : " + response.data.length);
  //         console.log("myOrders : " + JSON.stringify(response.data));
          
  //         if (response.data.length > 0) {
  //             setNoContent(false);
  //         }
  //     }
  //     catch (err) {
  //         console.log(JSON.stringify(err))
  //         console.log("error while fetching renter")
  //     }
  // };


  // useEffect(() => {
  //   fetchMyOrderAsRenter();
  // }, []);

// <View style={styles.container}>
//           <CardList
//             items={rentalItems}
//             title=""
//             onItemPressed={(details) => navigation.navigate("productDetails", { details })}
            
//           />
          
//           {noContent && <OopsNoProducts />}
        
//         </View>


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <View style={styles.container}>
        <Text style={styles.title}>My Orders</Text>

        <View style={styles.empty}>
            <View style={styles.fake}>
              <View style={styles.fakeCircle} />

              <View>
                <View style={[styles.fakeLine, { width: 120 }]} />

                <View style={styles.fakeLine} />

                <View
                  style={[
                    styles.fakeLine,
                    { width: 70, marginBottom: 0 },
                  ]} />
              </View>
            </View>

            <View style={[styles.fake, { opacity: 0.5 }]}>
              <View style={styles.fakeCircle} />

              <View>
                <View style={[styles.fakeLine, { width: 120 }]} />

                <View style={styles.fakeLine} />

                <View
                  style={[
                    styles.fakeLine,
                    { width: 70, marginBottom: 0 },
                  ]} />
              </View>
            </View>

            <Text style={styles.emptyTitle}>Your order list is empty</Text>

            <Text style={styles.emptyDescription}>
              Once you start a new rental, you'll find the updated rental order displayed here.
            </Text>
          </View> 

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingBottom: 140,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Empty */
  empty: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    marginTop: 12,
  },
  emptyDescription: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: '#8c9197',
    textAlign: 'center',
  },
  /** Fake */
  fake: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  fakeCircle: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: '#e8e9ed',
    marginRight: 16,
  },
  fakeLine: {
    width: 200,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#e8e9ed',
    marginBottom: 8,
  },
});