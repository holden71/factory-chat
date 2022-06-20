import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannellList, Channell, Auth } from './modules';

// CSS
import 'stream-chat-react/dist/css/index.css';
import './css/auth.css';
import './css/main.css';
import './css/team.css';
import './css/thread.css';
import './css/user.css';

// Outer API
const chatClient = StreamChat.getInstance('5b62mgbsym97');

const AppMain = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if(!authToken) return <Auth />

    return (
        <div className="app__wrapper">
            <Chat client={chatClient} theme="team light">
                <ChannellList 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <Channell 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    );
}

export default AppMain;


// Cookies
const cookies = new Cookies();
const authToken = cookies.get("token");

if(authToken) {
    chatClient.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
    }, authToken)
}