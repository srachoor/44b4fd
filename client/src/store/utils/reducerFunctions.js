export const addMessageToStore = (state, payload) => {
  const { message, sender, activeConversation } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  
  // Need to copy the state into a completely new object, update it and return it. Can't update the state directly and return it.
  const copiedState = JSON.parse(JSON.stringify(state));

  // message.conversationId;
  const updatedConvo = copiedState.filter((convo)=> {
    return convo.id === message.conversationId;
  })

  const updatedConvoSender = updatedConvo[0].otherUser.username;

  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.numOfUnreadMessages = 1;
    return [newConvo, ...copiedState];
  }

  return copiedState.map((convo) => {
    if (convo.id === message.conversationId) {
      convo.messages.push(message);
      convo.latestMessageText = message.text;
      if (convo.otherUser.id !== message.senderId) {
        convo.numOfUnreadMessages = 0;
      } else {
        if (activeConversation === updatedConvoSender) {
          convo.numOfUnreadMessages = 0;
        } else {
          convo.numOfUnreadMessages++;
        }
      }
      return convo;
    } else {
      return convo;
    }
  });

};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};
  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });
  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });
  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  const copiedState = JSON.parse(JSON.stringify(state));
  return copiedState.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      convo.id = message.conversationId;
      convo.messages.push(message);
      convo.latestMessageText = message.text;
      return convo;
    } else {
      return convo;
    }
  });
};

export const updateReadReceiptToStore = (state, conversation) => {
  const copiedState = JSON.parse(JSON.stringify(state));
  const copiedConvo = JSON.parse(JSON.stringify(conversation));  

  for(let i = 0; i < copiedConvo.messages.length; i++){
    if(copiedConvo.messages[i].senderId !== copiedConvo.otherUser.id){
      continue;
    } else {
      if (copiedConvo.messages[i].isReadByRecipient === false){
        copiedConvo.messages[i].isReadByRecipient = true;
      } else {
        break;
      }
    }
  }
  copiedConvo.numOfUnreadMessages = 0;
  
  return copiedState.map((convo)=> {
    if(convo.id === copiedConvo.id){
      return copiedConvo;
    } else {
      return convo;
    }
  })
}

export const updateReadReceiptsOfOtherUserToStore= ((state, payload) => {
  const {conversation, readRecipient, user} = payload;
  const copiedState = JSON.parse(JSON.stringify(state));
  const conversationId = conversation.id;
  const currentUserId = user.id;

  if(readRecipient === user.username) {
    return copiedState.map((convo) => {
      if (convo.id === conversationId) {
        convo.messages.map((message) => {
          if(message.senderId === currentUserId) {
            message.isReadByRecipient = true;
          }
          return message;
        })
        return convo;
      } else {
        return convo;
      }
    })
  }
  return copiedState;
})