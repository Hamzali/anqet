import { Text, TouchableOpacity, View } from "react-native-ui-lib";

export type ToggleButtonOption<T> = {
  value: T;
  label: string;
};

export type ToggleButtonProps<T> = {
  value: T;
  onChange: (value: T) => void;
  options: ToggleButtonOption<T>[];
};

function ToggleButton<T>(props: ToggleButtonProps<T>) {
  return (
    <View row spread>
      {props.options.map((option, key) => {
        const selected = props.value === option.value;
        return (
          <TouchableOpacity
            paddingV-16
            paddingH-32
            br10
            bg-primary={selected}
            bg-white={!selected}
            key={`${option.value}-${key}`}
            onPress={() => {
              props.onChange(option.value);
            }}
          >
            <Text text50L white={selected}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default ToggleButton;
