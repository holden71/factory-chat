import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const channelByUser = async ({ client, setActiveChannel, channel, setChannel }) => {
  const filters = {
    type: 'messaging',
    member_count: 2,
    members: { $eq: [client.user.id, client.userID] },
  };

  const [existingChannel] = await client.queryChannels(filters);

  if (existingChannel) return setActiveChannel(existingChannel);

  const newChannel = client.channel('messaging', { members: [channel.id, client.userID] });

  setChannel(newChannel)

  return setActiveChannel(newChannel);
};

const SearchResult = ({ channel, focusedId, type, setChannel, setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();

  if (type === 'channel') {
    return (
      <div
        onClick={() => {
          setChannel(channel)
          if (setToggleContainer) {
            setToggleContainer((prevState) => !prevState)
          }
        }}
        className={focusedId === channel.id ? 'search__result-container__focused' : 'search__result-container'}
      >
        <div className='result-hashtag'>#</div>
        <p className='search__result-text'>{channel.data.name}</p>
      </div>
    );
  }

  return (
    <div
      onClick={async () => {
        channelByUser({ client, setActiveChannel, channel, setChannel })
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState)
        }
      }}
      className={focusedId === channel.id ? 'search__result-container__focused' : 'search__result-container'}
    >
      <div className='search__result-user'>
        <Avatar image={channel.image || undefined} name={channel.name} size={24} />
        <p className='search__result-text'>{channel.name}</p>
      </div>
    </div>
  );
};

const Search = ({ teamChannels, directChannels, focusedId, loading, setChannel, setToggleContainer }) => {

  return (
    <div className='search__results'>
      <p className='search__results-header'>Каналы</p>
      {loading && !teamChannels.length && (
        <p className='search__results-header'>
          <i>Ищем...</i>
        </p>
      )}
      {!loading && !teamChannels.length ? (
        <p className='search__results-header'>
          <i>Каналы не найдены</i>
        </p>
      ) : (
        teamChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='channel'
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
      <p className='search__results-header'>Личные чаты</p>
      {loading && !directChannels.length && (
        <p className='search__results-header'>
          <i>Ищем...</i>
        </p>
      )}
      {!loading && !directChannels.length ? (
        <p className='search__res ults-header'>
          <i>Чаты не найдены</i>
        </p>
      ) : (
        directChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='user'
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
    </div>
  );
};

export default Search;