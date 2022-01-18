import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { updateMessagesToDB } from "../../store/utils/thunkCreators";
import { useEffect } from "react";

const useStyles = makeStyles((props) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
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
    height: '20px',
    lineHeight: '20px',
    width: '20px',
    textAlign: 'center',
    display: 'inline-block',
    verticalAlignSelf: 'middle',
    marginRight: '20px'
  },
  unReadMessages: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '10px',
    lineHeight: '20px',
    color: '#FFFFFF',
  },
  bolded:{
    color: 'black',
    fontWeight: 'bold',
  },
  wider:{
    width: '30px',
  }
}));



const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, activeConversation, updateMessagesToDB } = props;
  const { latestMessageText, otherUser, numOfUnreadMessages } = conversation;

  useEffect(() => {
    if (activeConversation === otherUser.username && conversation.messages.length > 0){
      updateMessagesToDB(conversation);
    }
  },[latestMessageText])

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={`${classes.previewText} ${(numOfUnreadMessages > 0 && activeConversation !== otherUser.username) && classes.bolded}`}>
          {latestMessageText}
        </Typography>
      </Box>
      {(numOfUnreadMessages > 0 && activeConversation !== otherUser.username) ? (
      <Box className={`${classes.rectangle} ${(numOfUnreadMessages > 9 ? classes.wider : '')}`}>
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
    updateMessagesToDB: (conversation) => {
      dispatch(updateMessagesToDB(conversation));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (ChatContent);
connect(mapStateToProps, null) (useStyles);
