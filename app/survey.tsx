import Alert from "@/components/Alert";
import FormTextField from "@/components/FormTextField";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { supabase } from "@/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Image, View } from "react-native-ui-lib";

type QuestionText = {
  en: string;
  tr: string;
};
type QuestionTextKey = keyof QuestionText;

type QuestionChoice = {
  value: string;
  label: QuestionText;
};
type Question =
  | {
      type: "TEXT";
      label: QuestionText;
    }
  | {
      type: "NUMBER";
      label: QuestionText;
    }
  | {
      type: "CHOICE";
      label: QuestionText;
      options: QuestionChoice[];
      multiple: boolean;
    };

type QuestionRendererProps = {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
};

function QuestionRenderer(props: QuestionRendererProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language ?? "en";

  const question = props.question;
  if (question.type === "TEXT") {
    const text = question.label[locale as QuestionTextKey] ?? question.label.en;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View gap-8>
          <ThemedText center>{text}</ThemedText>
          <FormTextField
            key="text"
            value={props.answer}
            onChangeText={props.onAnswerChange}
            inputMode="text"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  if (question.type === "NUMBER") {
    const text = question.label[locale as QuestionTextKey] ?? question.label.en;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View gap-8>
          <ThemedText center>{text}</ThemedText>
          <FormTextField
            value={props.answer}
            onChangeText={props.onAnswerChange}
            inputMode="numeric"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  if (question.type === "CHOICE") {
    const text = question.label[locale as QuestionTextKey] ?? question.label.en;
    const values = question.multiple ? props.answer.split(",") : [props.answer];
    return (
      <View gap-8 center>
        <ThemedText center>{text}</ThemedText>
        <View row gap-8 center>
          {question.options.map((option, key) => {
            const selected = values.includes(option.value);
            return (
              <Button
                key={key}
                bg-primary={selected}
                bg-white={!selected}
                grey10={!selected}
                label={
                  option.label[locale as QuestionTextKey] ?? option.label.en
                }
                onPress={() => {
                  if (question.multiple) {
                    const newValues = values.includes(option.value)
                      ? values.filter((v) => v !== option.value)
                      : [...values, option.value];
                    props.onAnswerChange(newValues.join(","));
                  } else {
                    props.onAnswerChange(option.value);
                  }
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

function Survey() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const params = useLocalSearchParams<{ surveyId: string }>();

  const surveyQuery = useQuery({
    queryKey: ["survey", params.surveyId],
    queryFn: async () => {
      const { data } = await supabase
        .from("surveys")
        .select("*")
        .eq("id", params.surveyId)
        .single()
        .throwOnError();

      if (data === null) {
        throw new Error("Survey not found");
      }

      return data;
    },
  });

  const templateId = surveyQuery.data?.survey_template_id ?? "";
  const templateQuery = useQuery({
    queryKey: ["template", templateId],
    queryFn: async () => {
      const { data } = await supabase
        .from("survey_templates")
        .select("*")
        .eq("id", templateId)
        .single()
        .throwOnError();

      if (data === null) {
        throw new Error("Template not found");
      }

      return data;
    },
    enabled: templateId !== "",
  });

  const answersQuery = useQuery({
    queryKey: ["answers", params.surveyId],
    queryFn: async () => {
      const { data } = await supabase
        .from("survey_answers")
        .select("*")
        .eq("survey_id", params.surveyId)
        .order("question_index")
        .throwOnError();

      return data;
    },
  });

  const answerMutation = useMutation({
    mutationFn: async (mutationParams: {
      questionIndex: number;
      answer: string;
    }) => {
      await supabase
        .from("survey_answers")
        .upsert({
          survey_id: params.surveyId,
          question_index: mutationParams.questionIndex,
          value: mutationParams.answer,
        })
        .throwOnError();
    },
    onSettled: () => {
      answersQuery.refetch();
    },
  });

  const [completed, setCompleted] = useState(false);
  const surveyCompleteMutation = useMutation({
    mutationFn: async () => {
      await supabase
        .from("surveys")
        .update({ status: "COMPLETED" })
        .eq("id", params.surveyId)
        .throwOnError();
    },
    onSuccess: () => {
      setCompleted(true);
    },
  });

  const [questionIndex, setQuestionIndex] = useState(0);

  const answers = answersQuery.data;
  const [answerInputs, setAnswerInputs] = useState<string[]>([]);

  const loading =
    surveyQuery.isLoading || templateQuery.isLoading || answersQuery.isLoading;
  if (loading) {
    return (
      <ThemedView flex center>
        <ThemedText>{t("loading")}</ThemedText>
      </ThemedView>
    );
  }

  const error =
    surveyQuery.isError || templateQuery.isError || answersQuery.isError;
  if (error) {
    return (
      <ThemedView flex center>
        <Alert level="error" message={t("surveyLoadError")} />
      </ThemedView>
    );
  }

  const survey = surveyQuery.data;
  const template = templateQuery.data;
  if (!survey || !template || !answers) {
    return (
      <ThemedView flex center>
        <Alert level="error" message={t("surveyNotFound")} />
      </ThemedView>
    );
  }

  if (completed) {
    return (
      <ThemedView flex center gap-16>
        <Image
          assetName="surveyCompleted"
          assetGroup="images"
          width={400}
          aspectRatio={1}
        />
        <ThemedText text50L>{t("surveyCompleted")}</ThemedText>
        <Button
          label={t("continue")}
          onPress={() => {
            queryClient.invalidateQueries({ queryKey: ["activeSurvey"] });
            router.back();
          }}
        />
      </ThemedView>
    );
  }

  // TODO: here requires schema validation for template.
  const templateConfig = template.config as { questions: Question[] };
  const questions = templateConfig.questions;

  const currentQuestion = questions[questionIndex];
  const currentAnswer =
    answers.find((a) => a.question_index === questionIndex)?.value ?? null;
  const currentAnswerInput = answerInputs[questionIndex];

  const firstQuestion = questionIndex === 0;
  const lastQuestion = questionIndex === questions.length - 1;

  const totalQuestions = questions.length;
  const questionPercentage = ((questionIndex + 1) / questions.length) * 100;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ThemedView flex gap-24 centerV paddingH-16 paddingV-36 spread>
        <View>
          <ThemedText center>
            {questionIndex + 1} / {totalQuestions}
          </ThemedText>
          <View row>
            <View bg-primary width={`${questionPercentage}%`} height={4} />
            <View bg-grey50 flex height={4} />
          </View>
        </View>
        <View>
          <ThemedText text50L marginB-24>
            Question {questionIndex + 1}:
          </ThemedText>
          <QuestionRenderer
            question={currentQuestion}
            answer={currentAnswerInput ?? currentAnswer ?? ""}
            onAnswerChange={(value) => {
              setAnswerInputs((prev) => {
                const newInputs = [...prev];
                newInputs[questionIndex] = value;
                return newInputs;
              });
            }}
          />
        </View>
        <View row gap-16 center>
          {!firstQuestion && (
            <Button
              label={t("prevQuestion")}
              onPress={() => {
                setQuestionIndex((prev) => Math.max(0, prev - 1));
              }}
            />
          )}
          {!lastQuestion && (
            <Button
              label={
                answerMutation.isPending
                  ? t("answerLoading")
                  : t("nextQuestion")
              }
              onPress={async () => {
                if (
                  currentAnswerInput &&
                  currentAnswerInput !== "" &&
                  currentAnswerInput !== currentAnswer
                ) {
                  await answerMutation.mutateAsync({
                    questionIndex,
                    answer: currentAnswerInput,
                  });
                }
                setQuestionIndex((prev) =>
                  Math.min(questions.length - 1, prev + 1)
                );
              }}
            />
          )}
          {lastQuestion && answers.length === questions.length - 1 && (
            <Button
              label={t("finishSurvey")}
              onPress={async () => {
                if (
                  currentAnswerInput &&
                  currentAnswerInput !== "" &&
                  currentAnswerInput !== currentAnswer
                ) {
                  await answerMutation.mutateAsync({
                    questionIndex,
                    answer: currentAnswerInput,
                  });
                  surveyCompleteMutation.mutate();
                }
              }}
            />
          )}
        </View>
        {answerMutation.isError && (
          <Alert message={t("answerFailed")} level="error" />
        )}
        {surveyCompleteMutation.isError && (
          <Alert message={t("surveyCompleteFailed")} level="error" />
        )}
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

export default Survey;
