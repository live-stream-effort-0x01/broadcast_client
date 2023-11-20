import { createEffect,createResource } from "solid-js";
import { getBroadcasts,Broadcasts  } from '~/lib/services/broadcasts';
import Card from "../Card/Card";
export default function ListCard() {
  const [broadcasts, { refetch }] = createResource<Broadcasts[]>(getBroadcasts);
  createEffect(()=>{
    refetch()
  },[broadcasts])
  return (
    <>
       {broadcasts()?.map((item:any, index) => (
        <Card key={index} props={item} />  
       ))}
    </>
  );
}
