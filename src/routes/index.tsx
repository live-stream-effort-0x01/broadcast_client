
import NavBar from '~/components/NavBar/NavBar';
import './styles.css'
import ListCard from '~/components/Listcard/Listcard';
import { getBroadcasts,Broadcasts  } from '~/lib/services/broadcasts';
import {
  createResource,
  createEffect 
} from "solid-js";
export default function Home() {
  const [broadcasts, { refetch }] = createResource<Broadcasts[]>(getBroadcasts);
  createEffect(()=>{
    refetch()
  },[broadcasts])
  return (
    <main class='home-warrper' >
      <div class='home-header'><NavBar/></div>
      <div class='home-container'>    
        <div class='home-title'>Recommended for you</div>
        <div class='home-list'>
          <ListCard />
        </div>
      </div>
      </main>
  );
}
