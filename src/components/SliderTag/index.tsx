import { Component, createSignal, For ,onMount} from "solid-js";
import { Slider, createSlider } from "solid-slider";

import './SliderTag.css';
import '@digichanges/solid-slider/dist/slider.css';





import icon from "../icon";


const SliderComponent: Component = () => {


  const sampleTagList = [
    {
        name: "Tag",
        action: "true",
    },
    {  
        name: "Tag Tag",
        action: "false",
    },

  ];

    const options = {duration: 1000, loop: true,  slidesToShow:3,   slidesToScroll:3 ,  perView: 2, spacing: 15,} ;
        const [ slider, {next, prev } ] = createSlider( options);
        slider ; 

      return <>
      <button class="slider-tag-button-left" onClick={prev}><img src={icon.prev}></img></button>
          
        <div use:slider>
        {sampleTagList?.map((item:any, index:number) => (
          <>
          <div class="slide-tag">
          <div class="slide-tag-title">{item.name}</div> 
          <div class="slide-tag-title tag-true">{item.name}</div> 
          <div class="slide-tag-title">{item.name}</div> 
          <div class="slide-tag-title">{item.name}</div> 
          <div class="slide-tag-title">{item.name}</div> 
          <div class="slide-tag-title tag-true">{item.name}</div> 
          <div class="slide-tag-title tag-true">{item.name}</div> 
          <div class="slide-tag-title tag-true">{item.name}</div> 
          <div class="slide-tag-title">{item.name}</div> 
         
         
      
          
          
          </div>
         
          </>
          
         ))}
            
        </div>
      
          
          <button class="slider-tag-button-right" onClick={next}><img src={icon.next}></img></button>
       
      </>;
    };

export default SliderComponent;
