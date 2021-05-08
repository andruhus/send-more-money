import React, { ReactElement } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { NavBar } from "../component/NavBar";
import { Link, List, ListItem, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "10px",
      marginRight: "10px",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "40px",
      marginRight: "40px",
    },
  },
  img: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "486px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "700px",
    },
  },
  title: {
    ...theme.typography.h4,
    marginTop: "20px",
    marginBottom: "20px",
  },
  text: {
    ...theme.typography.h6,
  },
  developer: {
    ...theme.typography.h5,
    fontWeight: "bold",
  },
}));

export const MainPage = (): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <NavBar />
      <div className={classes.root}>
        <Typography className={classes.title}>
          Welcome to Puzzle pet project by It-Ad community
        </Typography>
        <Typography className={classes.text}>
          In this project we create service which allows you to play in popular
          geek-math game send-more-money in different varieties:
        </Typography>
        <img className={classes.img} src={"logo.png"} alt={"popular-game"} />
        <Typography className={classes.text}>
          Here you can try yourself in solving similar puzzles among the list of
          games liked by other players
        </Typography>
        <Typography className={classes.text}>
          We hope you will enjoy our work ;)
        </Typography>
        <Typography className={classes.title}>Contact information:</Typography>
        <Typography className={classes.developer}>
          Andriy Demydenko - backend part developer
        </Typography>
        <Typography className={classes.text}>
          <List>
            <ListItem>
              <Link
                href={"https://www.linkedin.com/in/andrii-demydenko-421ab01b2/"}
              >
                LinkedIn
              </Link>
            </ListItem>
            <ListItem>
              <Link href={"https://github.com/andruhus"}>GitHub </Link>
            </ListItem>
            <ListItem>
              <Link href={"tel:+380983392613"}>+38 098 339 2613</Link>
            </ListItem>
            <ListItem>
              <Link href={"mailto:aaademed@gmail.com"}>aaademed@gmail.com</Link>
            </ListItem>
          </List>
        </Typography>
        <Typography className={classes.developer}>
          Ihor Tarkhan - frontend part developer
        </Typography>
        <Typography className={classes.text}>
          <List>
            <ListItem>
              <Link href={"https://www.linkedin.com/in/ihortarkhan/"}>
                LinkedIn
              </Link>
            </ListItem>
            <ListItem>
              <Link href={"https://github.com/IhorTarkhan"}>GitHub </Link>
            </ListItem>
            <ListItem>
              <Link href={"tel:+380972557777"}>+38 097 255 7777</Link>
            </ListItem>
            <ListItem>
              <Link href={"mailto:ihor.tarkhan@gmail.com"}>
                ihor.tarkhan@gmail.com
              </Link>
            </ListItem>
          </List>
        </Typography>
      </div>
    </>
  );
};
