import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { User } from '.';
import { CloseCreateChannel } from '../assets';

const NameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault();
        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Название</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Добавление пользователей</p>
        </div>
    )
}

const CreateNew = ({ createType, setIsCreating }) => {
    const { client, setActiveChannel } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    const [channelName, setChannelName] = useState('');

    const CreateNew = async (e) => {
        e.preventDefault();

        try {
            const newChannel = await client.channel(createType, channelName, {
                name: channelName, members: selectedUsers
            });
            await newChannel.watch();
            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === 'team' ? 'Создание нового канала' : 'Создание личного чата'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating} />
            </div>
            {createType === 'team' && <NameInput channelName={channelName} setChannelName={setChannelName} />}
            <User setSelectedUsers={setSelectedUsers} />

            <div className="create-channel__button-wrapper" onClick={CreateNew}>
                <p>{createType === 'team' ? 'Создать канал' : 'Создать чат'}</p>
            </div>



        </div>
    )
}

export default CreateNew
