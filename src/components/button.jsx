import * as React from "react";
import { Button } from "@rneui/base";

const ButtonComponent = (props) => {
  return (
    <Button
      type="outline"
      buttonStyle={{ width: 150, height : 70, borderColor: "#abdbe3" }}
      containerStyle={{ margin: 5 }}
      disabledStyle={{}}
      disabledTitleStyle={{}}
      linearGradientProps={null}
      iconContainerStyle={{ background: "#abdbe3" }}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      //TODO: need to change this to open the time picker
      onPress={() => alert("click")}
      title={props.title}
      titleStyle={{
        font: "Tahoma",
        fontSize: 15,
        color: "gray",
        fontWeight: "bold"
      }}
    />
  );
}

export default ButtonComponent;