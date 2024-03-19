import { JSX } from "solid-js";
import { Portal } from "solid-js/web";
import './Popup.css';
import { Component } from "solid-js";

interface PopupProps {
  onClose: () => void;
  children: JSX.Element;
}

const Popup: Component <PopupProps>= (props): JSX.Element => {
  const { onClose, children } = props;

  return (
    <Portal mount={document.body}>
      <div class="popup-wapper">
        <div class="popup-container">
          <button onClick={onClose} class='popup-btn'>x</button>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Popup;