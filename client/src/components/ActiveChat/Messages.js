import React, {useEffect, useState, useCallback} from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble, ReadBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const [indexOfLastMessageRead, setIndexOfLastMessageRead] = useState(-1);

  const findLastRead = useCallback(() => {
    if (messages.length === 0 ||messages[messages.length - 1].senderId === otherUser.id ) {
      return;
    }
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].senderId === userId && messages[i].isReadByRecipient === true){
        setIndexOfLastMessageRead(i);
        return;
      }
    }
  },[messages])

  useEffect(() => {
    findLastRead();
  },[messages])

  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (<div key={message.id}>
          <SenderBubble text={message.text} time={time} />
          {index === indexOfLastMessageRead ? <ReadBubble otherUser = {otherUser}></ReadBubble> : null}
        </div>) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
