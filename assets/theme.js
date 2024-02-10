const COLORS = {
  primary: "#312651",
  secondary: "#444262",
  tertiary: "#FF7754",
  black: '#000000',

  grey: "#83829A",
  grey2: "#C1C0C8",
  grey3: '#616161',
  lightgrey: '#E0E0E0',

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
  blue: '#3373FF',
  blue2: '#01579B',
  blue3: '#283593',

  purple: '#9575CD',
  lightPurple: '#B39DDB',

  cream: '#FFE5B4',
  orenge: '#FB8C00',
  darkBlue: '#1F4690',
  veryDarkBlue: '#130D33',
  lightgreen: '#1DE9B6',
  btnBlue: '#266EF1',   // the color of the home Page header
  searchGreen: '#5bd2bc',

  background: '#F2F2F2',
  lightBackground: '#e8ecf4',  //light grey 
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
