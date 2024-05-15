import * as React from "react";
import { Divider } from "@rneui/base";
import { COLORS } from "../../assets/theme";

const divLine = () => {
  return (
    <Divider
<<<<<<< HEAD
      style={{ width: "90%", marginTop: 20, marginLeft:20, marginBottom:10 }}
=======
      style={{ width: "90%", margin: 20 }}
>>>>>>> 77fb1a4 (improve filters, input validation in AddNewProduct)
      color={COLORS.lightgrey}
      insetType="left"
      subHeaderStyle={{}}
      width={1}
      orientation="horizontal"
    />
  );
}

export default divLine;