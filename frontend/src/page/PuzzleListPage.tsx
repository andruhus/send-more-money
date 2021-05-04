import React, { ReactElement } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";
import { Button, Paper } from "@material-ui/core";
import { interactiveRouting } from "../constant/routes";
import { useHistory } from "react-router-dom";
import MaterialTable, { Column } from "material-table";
import { tableIcons } from "../util/table-util";
import { QuestionResponse } from "../dto/response/QuestionResponse";

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
    { title: "Name", render: (x) => x.name },
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

  // TODO uncomment after task TR-29
  // const [, data] = useGetAllQuestionInfos();
  const data = [
    {
      id: 1,
      name: "send + more = money",
      triedCount: 19,
      solvedCount: 15,
      likeCount: 11,
    },
    {
      id: 4,
      name: "Test task",
      triedCount: 14,
      solvedCount: 7,
      likeCount: 4,
    },
  ];

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
