import React, { useEffect, useState } from 'react';

import './SASS/main.scss';

import { connectBackgroundTransitionGroup } from './utilities/connectBackgroundTransition';

import Loader from './components/Loader';
import Jitsi from 'react-jitsi';


const App = () => {

  const [displayName, setDisplayName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [onCall, setOnCall] = useState(false);

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
              {onCall?<span>GO BACK&nbsp;&#8676;</span>:''}
            </div>
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
            <div className="call-form">
              
              <p>Create / Join a Room</p>
              
              <input 
                type='text' 
                placeholder='Room name' 
                value={roomName} 
                onChange={e => setRoomName(e.target.value)}/>
                
              <input 
                type='text' 
                placeholder='Your name' 
                value={displayName} 
                onChange={e => setDisplayName(e.target.value)}/>
              
              <button onClick={() => setOnCall(true)}>
                CONNECT
              </button>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
// 