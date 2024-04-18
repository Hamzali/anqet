import { useTranslation } from "react-i18next";
import ToggleButton, { ToggleButtonOption } from "./ToggleButton";

type GenderToggleButtonProps = {
  value: string;
  onChange: (value: string) => void;
};

function GenderToggleButton(props: GenderToggleButtonProps) {
  const { t } = useTranslation();
  const genderOptions: ToggleButtonOption<string>[] = [
    {
      value: "male",
      label: t("male"),
    },
    {
      value: "female",
      label: t("female"),
    },
  ];

  return (
    <ToggleButton
      value={props.value}
      options={genderOptions}
      onChange={props.onChange}
    />
  );
}

export default GenderToggleButton;
