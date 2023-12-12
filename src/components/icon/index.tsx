import send from'./send_icon.svg'
import offMic from './offMic_icon.svg'
import onMic from './onMic_icon.svg'
import onCamera from'./onCamera_icon.svg'
import offCamera from './offCamera_icon.svg'
import onScreen from './onScreen_icon.svg'
import offScreen from './offScreen_icon.svg'
import disconnect from './disconnect_icon.svg'
import bars from'./bars_icon.svg'
import barsStagg from'./barsStaggered_icon.svg'
import logout from './logout_icon.svg'
const icon: Record<string, string> = {
    sendIcon: send,
    offMicIcon:offMic,
    onMicIcon: onMic,
    onCameraIcon:onCamera,
    offCameraIcon:offCamera,
    onScreenIcon:onScreen,
    offScreenIcon:offScreen,
    disconnectIcon:disconnect,
    bars: bars,
    barsStagg:barsStagg,
    logout:logout
    
  };
  
  export default icon;