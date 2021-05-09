import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { CharacterQuizInput } from "./CharacterQuizInput";
import { EmptyCharacterQuizInput } from "./EmptyCharacterQuizInput";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

type Props = {
  word: string;
  maxCharacters: number;
  answer: Map<string, number | null>;
  setNumber: (char: string, value: string) => void;
  isSubmitClicked: boolean;
};

export const WordQuizInput = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {[
        ...Array(props.maxCharacters - props.word.length).fill(""),
        ...props.word.split(""),
      ].map((it, index) => (
        <div key={index}>
          {it ? (
            <CharacterQuizInput
              answer={props.answer}
              char={it}
              setNumber={props.setNumber}
              isSubmitClicked={props.isSubmitClicked}
            />
          ) : (
            <EmptyCharacterQuizInput />
          )}
        </div>
      ))}
    </div>
  );
};
