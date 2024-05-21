import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../assets/theme";

const styles = StyleSheet.create({
  googleInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  googleTextInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
  },
  container: {
    width: "100%",
    flex: 1,
    justifyContent: 'center',
    flexDirection: "column",
    margin: 10,
    backgroundColor: COLORS.lightBackground,
  },
  dateSelectorContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: "column",
    marginTop: 15,
  },
  userName: {
    fontSize: 18,
    color: COLORS.black,
    margin: 10,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.cartTitle,
    fontWeight: 'bold',
    marginTop: 0,
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
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  btn: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'left',
    //justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    borderColor: '#266EF1',
  },
  uploadImgButton: {
    backgroundColor: COLORS.lightgrey,
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    alignSelf: 'left',
    marginTop: 20,
    marginLeft: 8,
    height: 50,

  },
  buttonText: {
    color: COLORS.similarToBlack,
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.cartTitle,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  /** Header */
  header: {
    marginVertical: 10,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    marginLeft: 12,
  },
  datesLables: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f3eff6',   // grey color good
    paddingHorizontal: 25,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#222',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#000',
  },
  btnSecondaryText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#000',
  },
  GoogleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: COLORS.lightgrey,
  },
  /** Picker */
  picker: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  pickerDates: {
    marginLeft: 12,
  },
  pickerDatesText: {
    fontSize: 13,
    fontWeight: '500',
  },
  pickerAction: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerActionText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
    color: '#4c6cfd',
  },
  /** Divider */
  divider: {
    overflow: 'hidden',
    width: '100%',
    marginVertical: 24,
  },
  dividerInset: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderStyle: 'dashed',
    marginTop: -2,
  },
  dateView: {
    marginTop: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
});

export default styles;
