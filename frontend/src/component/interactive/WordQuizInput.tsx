import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { CharacterQuizInput } from "./CharacterQuizInput";
import { EmptyCharacterQuizInput } from "./EmptyCharacterQuizInput";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));

type Props = {
  word: string;
  maxCharacters: number;
  answer: Map<string, { value: number | null; errorMessage: string }>;
  setNumber: (char: string, value: string) => void;
  isSubmitClicked: boolean;
};

export const WordQuizInput = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {Array(props.maxCharacters - props.word.length)
        .fill("")
        .map((_, index) => (
          <EmptyCharacterQuizInput key={index} />
        ))}
      {props.word.split("").map((it, index) => (
        <CharacterQuizInput
          key={index}
          answer={props.answer}
          char={it}
          setNumber={props.setNumber}
          isSubmitClicked={props.isSubmitClicked}
        />
      ))}
    </div>
  );
};
