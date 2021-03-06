import React, { ReactElement } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";
import { Button, Paper } from "@material-ui/core";
import { interactiveRouting } from "../constant/routes";
import { useHistory } from "react-router-dom";
import MaterialTable, { Column } from "material-table";
import { tableIcons } from "../util/table-util";

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    overflowX: "auto",
    marginTop: theme.spacing(3),
  },
}));

type Question = {
  id: number;
  name: string;
};

export const PuzzleListPage = (): ReactElement => {
  const history = useHistory();
  const classes = useStyles();

  const columns: Column<Question>[] = [
    { title: "Name", render: (x) => x.name },
    {
      render: (question) => (
        <Button
          onClick={() => history.push(`${interactiveRouting}/${question.id}`)}
        >
          Try to solve
        </Button>
      ),
    },
  ];
  const data: Question[] = [
    {
      id: 4,
      name: "Test task",
    },
  ];

  return (
    <>
      <NavBar />
      <Paper className={classes.table}>
        <MaterialTable
          title={"Demo Title"}
          columns={columns}
          data={data}
          icons={tableIcons}
        />
      </Paper>
    </>
  );
};
