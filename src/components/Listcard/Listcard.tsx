import { createEffect,createResource } from "solid-js";
import { getBroadcasts,Broadcasts  } from '~/lib/services/broadcasts';
import Card from "../Card/Card";
import { Component } from 'solid-js';
const ListCard:Component=()=> {
  const [broadcasts, { refetch }] = createResource<Broadcasts[]>(getBroadcasts);
  createEffect(()=>{
    refetch()
  },[broadcasts])
  return (
    <>
       {broadcasts()?.map((item:any, index:number) => (
        <Card  props={item} />  
       ))}
    </>
  );
}
export default ListCard
