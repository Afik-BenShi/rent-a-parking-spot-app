import * as React from "react";
import { Divider } from "@rneui/base";

const divLine = () => {
  return (
    <Divider
      style={{ width: "80%", margin: 20 }}
      color="#abdbe3"
      insetType="left"
      subHeaderStyle={{}}
      width={1}
      orientation="horizontal"
    />
  );
}

export default divLine;