import React, { useState } from 'react';
import './Notification.css';
import icon from '~/components/icon'; 

interface DisconnetNotiProps {
  onDisconnet: () => void;
  onClose: () => void;
  onOut: () => void;
}

const DisconnetNoti: React.FC<DisconnetNotiProps> = ({ onDisconnet, onClose, onOut }) => {
  const [change, setChange] = useState<boolean>(false);

  return (
    <div className='noti-wapper'>
      {change ? (
        <span className="noti-title">Return to the home Page</span>
      ) : (
        <span className="noti-title">Do you want to stop broadcasting?</span>
      )}
      
      <div className="noti-btns">
        {change ? (
          <button className="noti-btn noti-red" onClick={onOut}>
            <img src={icon.disconnectIcon} alt="Disconnect" />
          </button>
        ) : (
          <>
            <button className="noti-btn noti-green" onClick={() => { onDisconnet(); setChange(true); }}>
              Yes
            </button>
            <button className="noti-btn noti-red" onClick={onClose}>No</button>
          </>
        )}
      </div>
    </div>
  );
};

export default DisconnetNoti;
