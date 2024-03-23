import { createEffect,createResource } from "solid-js";
import { getBroadcasts,Broadcasts  } from '~/lib/services/broadcasts';
import Card from "../Card/Card";
import { Component } from 'solid-js';
import './Listcard.css';
const ListCard:Component=()=> {
  const [broadcasts, { refetch }] = createResource<Broadcasts[]>(getBroadcasts);
  createEffect(()=>{
    refetch()
  },[broadcasts])
  return (
    <>
       <div class="card-container">
      {broadcasts()?.map((item: any, index: number) => (
        <Card props={item} />
      ))}
    </div>
    </>
  );
}
export default ListCard
