import { createEffect,createResource } from "solid-js";
import { getBroadcasts,Broadcasts  } from '~/lib/services/broadcasts';
import Card from "../Card/Card";
import { Component } from 'solid-js';

const ListCardI:Component=()=> {
  const [broadcasts, { refetch }] = createResource<Broadcasts[]>(getBroadcasts);
  createEffect(()=>{
    refetch()
  },[broadcasts])
 
  return (
    <div class="list-warper">
      <div class="list-top">
      <span class="list-top-title green bold" >Live Channels </span>
        <span class="list-top-title black">you might be interested in</span>
       
      </div>
      <div class="list-main">   {broadcasts()?.map((item:any, index:number) => (
        <>
        <Card props={item} />   
        <Card props={item} />   
        <Card props={item} />   
        <Card props={item} />  
        <Card props={item} />  
      
        </>
        
       ))}</div>
     <div class="list-bottom">
      <span class="line-list"></span>
      <span class="list-bottom-title">Show more</span>
      <svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="1em" width="1em" style="overflow: visible; color: #03AD5F;"><path fill="currentColor" d="m12 13.171 4.95-4.95 1.414 1.415L12 16 5.636 9.636 7.05 8.222l4.95 4.95Z"></path></svg>
     </div>
    </div>
  );
}
export default ListCardI
