import React from 'react';
import { MessageTeam, useMessageContext } from 'stream-chat-react';

const TMessage = () => {
    const { message } = useMessageContext();
    return (<MessageTeam message={{ ...message, user: {} }} />)
}

export default TMessage
