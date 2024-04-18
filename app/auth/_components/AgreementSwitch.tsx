import ThemedText from "@/components/ThemedText";
import { Colors, Switch, View } from "react-native-ui-lib";

export type AgreementSwitchProps = {
  value: boolean;
  agreementText: string;
  onValueChange: (value: boolean) => void;
};
function AgreementSwitch(props: AgreementSwitchProps) {
  return (
    <View row centerV gap-16>
      <Switch
        bg-primary
        onColor={Colors.primary}
        value={props.value}
        onValueChange={props.onValueChange}
      />
      <ThemedText
        flex
        style={{ flexWrap: "wrap" }}
        textBreakStrategy="highQuality"
      >
        {props.agreementText}
      </ThemedText>
    </View>
  );
}

export default AgreementSwitch;
