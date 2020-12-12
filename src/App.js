import React, { useState } from 'react';

import './SASS/main.scss';

import Loader from './components/Loader';

import Jitsi from 'react-jitsi';

const App = () => {

  const [displayName, setDisplayName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [onCall, setOnCall] = useState(false);
  
  return (
    <div className="container-fluid main-container">
      <div className="row my-5">
        <div className="col">
          <h1 className="my-title">hey there buddy</h1>
          <hr className="mb-5 mt-4 myHR"></hr>
            <div className="jisti-container">
              { onCall ?
                <Jitsi
                  roomName={roomName}
                  displayName={displayName}
                  loadingComponent={Loader}
                  onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!')}
                  config={{prejoinPageEnabled: false}}
                />
              :
                <>
                  <h1>Crate a Meeting</h1>
                  <input type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)} />
                  <input type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)} />
                  <button onClick={() => setOnCall(true)}> Let&apos;s start!</button>
                </>
              }
            </div>
          <hr className="mt-5 myHR"></hr>
        </div>
      </div>
    </div>
  );
};
export default App;