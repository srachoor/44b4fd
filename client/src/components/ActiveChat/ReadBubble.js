import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
    },
    readBubble: {
        height: 20,
        width: 20,
        marginTop: 5,
    },
  }));

const ReadBubble = (props) => {
  const { otherUser } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
        <Avatar className={classes.readBubble} src={otherUser.photoUrl}></Avatar>
    </Box>
  );
};

export default ReadBubble;
  