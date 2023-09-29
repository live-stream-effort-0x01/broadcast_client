import { Title } from "solid-start";
import Counter from "~/components/Counter";

export default function Home() {
  return (
    <main>
        <h1 class="demo-title">Current Broadcasts</h1>
        <div class="cards">
            <div class="card">
                <img src="images/broadcast.png" alt="broadcast image" width="320" height="240" class="card-image" />
                <h1 class="card-title">Card 1</h1>
            </div>
        </div>
    </main>
  );
}
