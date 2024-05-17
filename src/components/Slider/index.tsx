import { Component, createSignal, For ,onMount} from "solid-js";
import { Slider, createSlider } from "solid-slider";

import './Slider.css';
import '@digichanges/solid-slider/dist/slider.css';





import icon from "../icon";
const SliderComponent: Component = () => {

  
 

    const options = {duration: 1000, loop: true,  slidesToShow:3,   slidesToScroll:3 ,  perView: 2, spacing: 15,} ;
        const [ slider, {next, prev } ] = createSlider( options);
        slider ; 

      return <>
      
        <div use:slider>
            <div class="slide slide1">
              <img class="slide-img-out" src="https://photo.znews.vn/w660/Uploaded/kbd_pilk/2020_07_26/5_1.jpg" alt=""></img>
              <div class="slide-img" >   
              <img src="https://photo.znews.vn/w660/Uploaded/kbd_pilk/2020_07_26/5_1.jpg" alt=""></img> 
               <form class="slide-hover">
                <div class="slide-hover-left" >
                  <img src="https://cdn-i.vtcnews.vn/files/f2/2016/03/13/than-hinh-boc-lua-cua-5-nu-dj-nong-bong-nhat-1.jpg"  alt="" class=" slide-hover-avatar"></img>
                  <div class=" slide-hover-content">
                  <span class=" slide-hover-content-name">
                    Sweetiefox
                  </span>
                  <span class=" slide-hover-content-view">
                    1.5k views
                  </span>
                  </div>
                </div> 
                <div class="slide-hover-right" >
                  <span class=" slide-hover-notify">check out this stream from athony_kongphan!</span>
                  <div class=" slide-hover-list-tag">
                    <div class="slide-hover-tag">Tag Tag</div>
                    <div class="slide-hover-tag">Tag </div>
                  
                  </div>
                </div> 
              </form>  </div>
               <img class="slide-img-out"  src="https://photo.znews.vn/w660/Uploaded/kbd_pilk/2020_07_26/5_1.jpg" alt=""></img>  
          
            
            
            </div>
            
            
        </div>
        <br/>
        <div style={{ "text-align": "center" }}>
          
          <br />
          <button class="slider-button-left" onClick={prev}><img src={icon.prev}></img></button>
          
          <button class="slider-button-right" onClick={next}><img src={icon.next}></img></button>
        </div>
      </>;
    };

export default SliderComponent;
