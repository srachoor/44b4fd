export const addMessageToStore = (state, payload) => {
  const { message, sender, activeConversation } = payload;
  
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.numOfUnreadMessages = 1;
    return [newConvo, ...state];
  }
    
  // identify who the sender is of the message so that store can appropriately update the number of read messages. So if the activeConversation === the sender of the conversation, that means that the message would be automatically read 
  
  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = {...convo};
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      if (convo.otherUser.id !== message.senderId) {
        convoCopy.numOfUnreadMessages = 0;
      } else {
        const updatedConvoSender = state.filter((convo)=> {
          return convo.id === message.conversationId;
        })[0].otherUser.username;
        if (activeConversation === updatedConvoSender) {
          convoCopy.numOfUnreadMessages = 0;
        } else {
          convoCopy.numOfUnreadMessages++;
        }
      }
      return convoCopy;
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
  
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = {...convo};
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const updateReadReceiptToStore = (state, conversation) => {
  const copiedConvo = {...conversation};

  copiedConvo.messages.map((message) => {
    if(message.senderId !== copiedConvo.otherUser.id) {
      return message;
    } else {
      if (message.isReadByRecipient === false) {
        message.isReadByRecipient = true;
        return message;
      } else {
        return message;
      }
    }
  })
  copiedConvo.numOfUnreadMessages = 0;
  
  return state.map((convo)=> {
    if(convo.id === copiedConvo.id){
      return copiedConvo;
    } else {
      return convo;
    }
  })
}

export const updateReadReceiptsOfOtherUserToStore = ((state, payload) => {
  const {conversation, readRecipient, user} = payload;
  const copiedState = JSON.parse(JSON.stringify(state));

  if(readRecipient === user.username) {
    return copiedState.map((convo) => {
      if (convo.id === conversation.id) {
        convo.messages.map((message) => {
          if(message.senderId === user.id) {
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
  return [...copiedState];
})