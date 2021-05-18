import React, { ReactElement } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";
import { Button, Paper } from "@material-ui/core";
import { interactiveRouting } from "../constant/routes";
import { useHistory } from "react-router-dom";
import MaterialTable, { Column } from "material-table";
import { tableIcons } from "../util/table-util";
import { QuestionResponse } from "../dto/response/QuestionResponse";
import { useGetAllQuestionInfos } from "../api/QuestionsApi";

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    overflowX: "auto",
    marginTop: theme.spacing(3),
  },
}));

export const PuzzleListPage = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();

  const columns: Column<QuestionResponse>[] = [
    { title: "Name", render: (x) => `${x.add1} + ${x.add2} = ${x.sum}` },
    { title: "Tried", render: (x) => x.triedCount },
    { title: "Solved", render: (x) => x.solvedCount },
    { title: "Likes", render: (x) => x.likeCount },
    {
      title: "Action",
      render: (question) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`${interactiveRouting}/${question.id}`)}
        >
          Try to solve
        </Button>
      ),
    },
  ];

  const [, data] = useGetAllQuestionInfos();

  return (
    <>
      <NavBar />
      <Paper className={classes.table}>
        {data ? (
          <MaterialTable
            title={"Demo Title"}
            columns={columns}
            data={data}
            icons={tableIcons}
          />
        ) : (
          <>Loading...</>
        )}
      </Paper>
    </>
  );
};
