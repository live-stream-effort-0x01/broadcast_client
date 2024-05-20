
import { createSignal } from 'solid-js';
import NavBar from '~/components/NavBar/NavBar';
import './styles.css'
import NavUser from "~/components/NavUser/index"
import ListCardI from '~/components/Listcard/ListcardI';
import Slider from '~/components/Slider/index'
import SliderTag from"~/components/SliderTag/index"
import AgeNoti from '~/components/Notification/AgeNoti';

import { getBroadcasts,Broadcasts  } from '~/lib/services/broadcasts';
import {
  createResource,
  createEffect 
  
} from "solid-js";
import { Component } from "solid-js";


const Home:Component=()=> {
  const [broadcasts, { refetch }] = createResource<Broadcasts[]>(getBroadcasts);
  createEffect(()=>{
    refetch()
  },[broadcasts])
  const [showModal, setShowModal] = createSignal(true);
  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <main class='home-warper' >
    
      <div class='home-header'><NavBar/></div>
      <div class='home-container'>   
      <div class='home-nav-user'> <NavUser /></div>
      <div class='home-main scroll'>
      <div class={showModal()? 'home-popup': ''}>
      
      { showModal() && (<AgeNoti onClose={closeModal}/> ) }
      </div>
      <div class='home-slider'> <Slider />  </div>
      <div class='home-slider-tag'> <SliderTag/>  </div>
      <div class='home-list'>
          <ListCardI />
          <ListCardI />
          <ListCardI />
          <ListCardI />
        </div>
      </div>
      </div>       
      
      </main>
  );
}
export default Home