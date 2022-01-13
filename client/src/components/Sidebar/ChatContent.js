import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { updateMessages } from "../../store/utils/thunkCreators";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  rectangle: {
    background: '#3F92FF',
    borderRadius: '10px',
    alignItems: 'center',
    height: '30px',
    lineHeight: '30px',
    minWidth: '30px',
    textAlign: 'center',
    display: 'inline-block',
    verticalAlignSelf: 'middle',
    marginRight: '5px'
  },
  unReadMessages: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '12px',
    letterSpacing: '-0.5px',
    lineHeight: '30px',
    color: '#FFFFFF',
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'middle',
    margin:'auto'
  },
  bolded:{
    color: 'black'
  }

}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, activeConversation, updateMessages } = props;
  const { latestMessageText, otherUser, numOfUnreadMessages } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={`${classes.previewText} ${(numOfUnreadMessages > 0 && activeConversation !== otherUser.username) ? classes.bolded : ''}`}>
          {numOfUnreadMessages > 0 ? <b>{latestMessageText}</b> : latestMessageText}
        </Typography>
      </Box>
      {(numOfUnreadMessages > 0 && activeConversation !== otherUser.username) ? (
      <Box className={classes.rectangle}>
          <Typography className={classes.unReadMessages}>
          {numOfUnreadMessages}
          </Typography>
      </Box>) : ''}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: (conversation) => {
      dispatch(updateMessages(conversation));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (ChatContent);
