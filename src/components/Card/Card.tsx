import { createSignal} from 'solid-js';
import './Card.css'
import { FiBookmark } from 'solid-icons/fi'
import { FaSolidBookmark } from 'solid-icons/fa'
import { TbMovie } from 'solid-icons/tb'
import { Component } from 'solid-js';

interface CardProps{
props :any
}



const Card: Component <CardProps>= (props) =>{
 const name:string = props?.props?.name 
 const type:string = props?.props?.type
 const seri:string = props?.props?.seri
 const img:string = props?.props?.img
 const year:string = props?.props?.year
 const description:string= props?.props?.description
const icon:any = props?.props?.icon

 const [live, setLive] = createSignal(true);

  return (
    <div class='card-wapper'>
     <div class='card-image'>
        <img alt='' src={img? img :'https://www.lacremedugaming.fr/wp-content/uploads/creme-gaming/2023/02/amouranth-dit-que-la-vie-est-meilleure-apres-avoir-echange.-646x410.jpg'}></img>
        <div class='card-favourite' >
          {live()? <span class='red-point'></span>:  <span class='none'></span>}
        </div>
        <div class='card-views' >
          {live()? <span class='card-views-count'>2.5k Views</span>:  <span class='none'></span>}
        </div>
     </div>
    <div class='card-title'>
    <div class='card-title-left'>
        <img  src="https://cdn-i.vtcnews.vn/files/f2/2016/03/13/than-hinh-boc-lua-cua-5-nu-dj-nong-bong-nhat-1.jpg"  alt="" class='card-title-avatar'></img>
     
        <div class='card-title-content'>
        <div class='card-name'> {name}</div>
        <div class='card-price'> $ 5.99</div>
        <div class='card-desc'>sweetiefox</div>        
        </div>
        </div>
   
    <div class='card-title-right'>
    <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="1em" width="1em" style="overflow: visible; color: #02ad3b;"><path d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm64 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zm384 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"></path></svg>
    </div>
   
    </div>
    </div>
  );
}
export default Card;