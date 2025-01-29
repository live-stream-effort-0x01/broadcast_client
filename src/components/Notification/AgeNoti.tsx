import React from 'react';
import './Notification.css';

interface AgeNotiProps {
  onClose: () => void;
}

const AgeNoti: React.FC<AgeNotiProps> = (props) => {
  const { onClose } = props;

  return (
    <div className='noti-wapper'>
      <span className="noti-title">Are you 18+</span>
      <div className='noti-content'>
        You must be 18 years old and agree to our
        <span className='green'>Terms and Conditions</span> before continuing
      </div>
      <button className='noti-btn bg-green border-green' onClick={onClose}>I agree</button>
      <button className='noti-btn border-black'>I am not over 18</button>
    </div>
  );
};

export default AgeNoti;
