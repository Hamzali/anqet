import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { FontAwesome } from "@expo/vector-icons";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { Colors, TouchableOpacity, View } from "react-native-ui-lib";

type StatProps = {
  value: string;
  label: string;
};
function Stat(props: StatProps) {
  return (
    <View center>
      <ThemedText text20 primary>
        {props.value}
      </ThemedText>
      <ThemedText text50L>{props.label}</ThemedText>
    </View>
  );
}

function Divider() {
  return <View bg-grey50 width={1.5} height={"80%"}></View>;
}

function Report() {
  const { t } = useTranslation();
  const stats = {
    total: 10,
    score: 5,
    today: 5,
  };

  const completedSurveys = [
    {
      id: "1",
      name: "Survey 1",
      timestamp: "2021-09-01T10:33:00.000Z",
    },
    {
      id: "2",
      name: "Survey 2",
      timestamp: "2021-09-01T10:33:00.000Z",
    },
    {
      id: "3",
      name: "Survey 3",
      timestamp: "2021-09-01T10:33:00.000Z",
    },
    {
      id: "4",
      name: "Survey 4",
      timestamp: "2021-09-01T10:33:00.000Z",
    },
  ];
  return (
    <ThemedView flex useSafeArea>
      <View gap-16 marginV-80>
        <ThemedText text50L center>
          {t("completedSurveys")}
        </ThemedText>

        <View row center gap-24>
          <Stat value={stats.score.toString()} label={t("reportScore")} />
          <Divider />
          <Stat value={stats.total.toString()} label={t("reportTotal")} />
          <Divider />
          <Stat value={stats.today.toString()} label={t("reportToday")} />
        </View>
      </View>

      <View row centerV gap-8 paddingH-36 marginB-8>
        <FontAwesome name="list" size={16} color={Colors.textColor} />
        <ThemedText>{t("list")}</ThemedText>
      </View>
      <FlatList
        style={{ flex: 1, paddingHorizontal: 36 }}
        data={completedSurveys}
        renderItem={(props) => {
          const date = format(props.item.timestamp, "P");
          const time = format(props.item.timestamp, "k:mm");
          return (
            <TouchableOpacity paddingH-16 paddingV-12 bg-grey60 marginB-8 br10>
              <ThemedText primary>{props.item.name}</ThemedText>
              <View row gap-8>
                <View row gap-4 center>
                  <FontAwesome
                    name="calendar"
                    size={16}
                    color={Colors.primary}
                  />
                  <ThemedText grey10>{date}</ThemedText>
                </View>
                <View row gap-4 center>
                  <FontAwesome
                    name="clock-o"
                    size={16}
                    color={Colors.primary}
                  />
                  <ThemedText grey10>{time}</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </ThemedView>
  );
}

export default Report;
