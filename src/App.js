import React, { useEffect, useState } from 'react';

import './SASS/main.scss';

import { connectBackgroundTransitionGroup } from './utilities/connectBackgroundTransition';

import Loader from './components/Loader';
import Jitsi from 'react-jitsi';


const App = () => {

  const [displayName, setDisplayName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [onCall, setOnCall] = useState(false);

  const [chat, setChat] = useState(false);
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.persist();
    console.log("e?:::",e)
    if(e.key === 'Enter' && e.target.value !== "") {
      let newMessage = e.target.value;
      console.log("input?", newMessage)
      setMessages([...messages, newMessage]);
      e.target.value = "";
      console.log("messages", messages)
    } else {
      return;
    }
  };

  useEffect(()=> {
    if(onCall === true) {
      connectBackgroundTransitionGroup.onConnect();
    }
    else if(onCall === false) {
      connectBackgroundTransitionGroup.onDisconnect();
    }
  },[onCall])
  
  return (
    <div className="container-fluid main-container">
      
      <div className="row">
        <div className="col">
          
          <div className="header">
            <div 
              className="go-back" 
              onClick={()=>setOnCall(false)}>
              2021 michael cote &infin;&nbsp;
              {onCall?<span><button className="badge badge-secondary">GO BACK&nbsp;&larr;</button></span>:''}
            </div>
            <span 
              onClick={()=>setChat(!chat)}
              role="img" 
              className="ml-3"
              title="test-chat 🚧🚧🚧"
              aria-label="fu">🧪</span>
          </div>
          
          <div className="jitsi-container">
            { onCall ?
              <Jitsi
                roomName={roomName}
                displayName={displayName}
                loadingComponent={Loader}
                
                onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!', JitsiMeetAPI)}
                
                config={{
                  prejoinPageEnabled: false,
                  disableDeepLinking: true,
                  transcribingEnabled: true
                }}
                
                interfaceConfig={{
                  APP_NAME: 'Cotes Chat',
                  SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                  SHOW_JITSI_WATERMARK: false,
                  SHOW_BRAND_WATERMARK: false,
                  DISABLE_TRANSCRIPTION_SUBTITLES: false,
                  LANG_DETECTION: true,
                  TOOLBAR_BUTTONS: ['microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                  'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
                  'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                  'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                  'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'],
                  TOOLBAR_ALWAYS_VISIBLE: true
                }}
              />
            :
            <div className="call-form p-4">
              
              <p>Create / Join a Room</p>
              
              <input 
                type='text' 
                className="form-control mb-3" 
                placeholder='Room name' 
                value={roomName} 
                onChange={e => setRoomName(e.target.value)}/>
                
              <input 
                type='text' 
                className="form-control mb-3" 
                placeholder='Your name' 
                value={displayName} 
                onChange={e => setDisplayName(e.target.value)}/>
              
              <button 
                className="btn btn-secondary" 
                onClick={() => setOnCall(true)}>
                CONNECT&nbsp;
                <span><i className="fa fa-phone" aria-hidden="true"></i></span>
              </button>
            </div>
            }
          </div>
        </div>
      </div>
      {chat ? 
        <div className="chat">
          <p>test chat</p>
          <div className="messages-wrap mt-auto">
            {messages.map((m, i) => {
              return(
                <div className="message-x">
                  <div className="title-name">
                    <div className="user"></div>
                    <span>Michael Cote</span>
                    <small>12:00 AM</small>
                  </div>
                  <p 
                    className="chat-bubble"
                    key={i}>
                    <div className="content">{m}</div>
                  </p>
                </div>
              ); 
            })}
          </div>
          <input 
            autoFocus={true}
            onKeyPress={(e)=> sendMessage(e)}
            className="message-input form-control mt-5"
            type="text"/>
        </div>
      :""}
    </div>
  );
};
export default App;
// 