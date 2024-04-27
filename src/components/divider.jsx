import * as React from "react";
import { Divider } from "@rneui/base";
import { COLORS } from "../../assets/theme";

const divLine = () => {
  return (
    <Divider
      style={{ width: "90%", margin: 20 }}
      color={COLORS.lightgrey}
      insetType="left"
      subHeaderStyle={{}}
      width={1}
      orientation="horizontal"
    />
  );
}

export default divLine;