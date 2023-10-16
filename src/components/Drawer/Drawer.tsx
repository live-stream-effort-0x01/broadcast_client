import { createSignal } from "solid-js";
import "./Drawer.css"
import { FaSolidBars } from 'solid-icons/fa'
import { FaSolidBarsStaggered } from 'solid-icons/fa'
function Drawer(props:any) {
  const lable: object[] = props?.props
    const [isOpen, setIsOpen] = createSignal(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen());
    };
    return (
      <div class="drawer-hamburger-menu">
        <div class={`drawer-button`} onClick={toggleMenu}>
       {!isOpen()?<FaSolidBars />:<FaSolidBarsStaggered />
       }
        </div>
        {isOpen() && (
          <div class="drawer-menu-items">
          {lable.map((item:any, index) => (
           <>
           { 
            
                item?.ac ===false?
                <div class='drawer-item-a' > <a href={item?.link}>{item?.name}</a></div>:
                <form  class= {`drawer-item  ${item?.live ? 'yellow': 'green'}`} action={item?.acton}>
                <button  class={item?.live ? 'yellow': 'green'}  type="submit">{item?.name}</button>
                </form>
            }</>
           ))}
          </div>
        )}
      </div>
    );
}

export default Drawer;