
import NavBar from '~/components/NavBar/NavBar';
import './Home.css'
import Card from '~/components/Card/Card';
import { getBroadcasts,Broadcasts  } from '~/lib/services/broadcasts';
import {
  createResource,
  createSignal,
  createEffect 
} from "solid-js";


export default function Home() {
  const [broadcasts, { refetch }] = createResource<Broadcasts[]>(getBroadcasts);
  createEffect(()=>{
    refetch()
  },[broadcasts])
  const navBarItems = broadcasts()?.map((item:any,index:number) => {
    return<Card key={index} props={item} />
  });

  return (
    <main class='home-warrper' >
      <div class='home-header'><NavBar/></div>
      <div class='home-container'>    
        <div class='home-title'>Recommended for you</div>
        <div class='home-list'>{navBarItems}
        </div>
      </div>
      </main>
  );
}
