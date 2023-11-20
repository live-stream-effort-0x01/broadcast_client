import { createSignal } from "solid-js";
import { useNavigate } from "solid-start";
import { createRoom } from "~/lib/services/broadcasts";
export default function CreateRoomForm  (props: {
  onClose:()=>void;
})  {
  
  const [owner, setOwner] = createSignal<string>("");
  const [nameRoom, setNameRoom] = createSignal<string>("");
  const [error, setError] = createSignal<string>("");
  const [success, setSuccess] = createSignal<boolean>(false);
  const [loading, setLoading] = createSignal<boolean>(false);
  const { onClose} = props;
  const navigate = useNavigate();
  const create = async (e:Event) => {
    e.preventDefault()
    setLoading(true);
    setSuccess(false);
    setError("");
    try {
      const response: any = await createRoom({
        room_name: nameRoom(),
        owner: owner(),
        description: '',
        video_source: "",
      });
  
      setLoading(false);
    
    
      if (response.message) {
        setError(response.message);

        return;
      }
      setLoading(false);
      if(!response.message ){
        setLoading(false);
        setSuccess(true);
        sessionStorage.setItem("roomName", nameRoom() );
        sessionStorage.setItem("roomOwner",owner() );
        sessionStorage.setItem("live", 'true');
        setTimeout(() => {
          navigate('/chatRoom')
        onClose()
        }, 2000);

      }
     
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div class='form-wapper'>
      <span class="form-title">Create new room</span>
      <form class="form-post" id="login" onSubmit={create}>
        <div class="form-main">
          <div class="form-group-main">
            <input
              class="form-input-value"
              type="text"
              placeholder="Room name"
              name="Room_name"
              required
              onInput={(event) => setNameRoom(event.target.value)} />
            
          </div>
          <div class="form-group-main">
            <input
              class="form-input-value"
              type="text"
              name="Room_ID"
              placeholder="Room owner ID"
              required
              onInput={(event) => setOwner(event.target.value)} />
          </div>
        </div>
        {error() && <p class="form-error-message">{error()}</p>}
        {success() && <p class="form-success-message">Success!</p>}
        <div class="form-btn">
          <button type="submit"  class="form-btn-submit" 
          >
            <div class="form-btn-submit-title"  >  {loading() ? "Loading..." : "Create Room"}</div>
          </button>

        
        </div>
      </form>

    </div>

  );
};

