import { Portal } from "solid-js/web";
import { JSX } from "solid-js";
import './Popup.css'
export default function Popup(props: {
    onClose: () => void;
    children: JSX.Element;
  }): JSX.Element {
    const { onClose, children } = props;
    return (
      <Portal mount={document.body}>
        <div class="popup-wapper">
          <div class="popup-container">
            <button onClick={onClose} class='popup-btn'>X</button>
            {children}
          </div>
        </div>
      </Portal>
    );
  }