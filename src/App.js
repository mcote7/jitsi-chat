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
      <div className={onCall?"row my-1":"row my-5"}>
        <div className="col">
          <div className="my-wrap">&#8943;&#8886;&nbsp;Cote's Chat&nbsp;&#8887;&#8943;</div>
          <hr className={onCall?"my-1 myHR":"mt-5 mb-4 myHR"}></hr>
            <div className="jisti-container">
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
              <div className="my-wrap" style={{height: '320px'}}>
                <p className="my-ptag">Create / Join a Room</p>
                <input className="my-input" type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)}/>
                <input className="my-input" type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)}/>
                <button className="my-button" onClick={() => setOnCall(true)}>
                  <div className="connect"><span className="px-4">CONNECT</span></div>
                </button>
              </div>
              }
            </div>
          <hr className={onCall?"my-1 myHR":"mt-4 mb-5 myHR"}></hr>
          <div onClick={()=>setOnCall(false)}
            className="my-wrap p-1 pb-2 my-name">2021 michael cote &infin;&nbsp;
            {onCall?<span className="goBack ml-5">GO BACK&nbsp;&#8676;</span>:''}</div>
        </div>
      </div>
    </div>
  );
};
export default App;