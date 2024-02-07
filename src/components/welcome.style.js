import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../assets/theme";

const styles = StyleSheet.create({
  
  container: {
    width: "100%",
    flex: 1, 
    justifyContent: 'center', 
    flexDirection: "column",
    margin: 10,
  },
  userName: {
    fontSize: 18,
    color: COLORS.black,
    margin: 10,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.secondary,
    fontWeight: 'bold',
    margin: 10,
    marginLeft: 30,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.black,
    //fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },

  SubmitButton: {
    height: 50,
    width: 200,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  welcomeMessage: {
    fontSize: SIZES.xLarge,
    color: COLORS.orenge,
    margin: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  input: {
    fontSize: 14,
  },
  buttonText: {
    color: COLORS.black, 
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginLeft: 10,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10, // Adjust the margin as needed
  },
  

  //----
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
});

export default styles;
