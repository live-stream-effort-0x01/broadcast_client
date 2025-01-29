import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../../lib/services/broadcasts";
import "./Form.css";

interface CreateRoomFormProps {
  onClose: () => void;
}

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ onClose }) => {
  const [owner, setOwner] = useState<string>("");
  const [nameRoom, setNameRoom] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");
    try {
      const response: any = await createRoom({
        room_name: nameRoom,
        owner: owner,
        description: "",
        video_source: "",
      });

      setLoading(false);

      if (response.message) {
        setError(response.message);
        return;
      }
      setSuccess(true);
      localStorage.setItem("roomName", nameRoom);
      localStorage.setItem("roomOwner", owner);
      localStorage.setItem("live", "true");
      setTimeout(() => {
        navigate("/chatRoom");
        onClose();
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="form-wapper">
      <span className="form-title">Create new room</span>
      <form className="form-post" id="login" onSubmit={create}>
        <div className="form-main">
          <div className="form-group-main">
            <input
              className="form-input-value"
              type="text"
              placeholder="Room name"
              name="Room_name"
              required
              onInput={(event) => setNameRoom(event.target.value)}
            />
          </div>
          <div className="form-group-main">
            <input
              className="form-input-value"
              type="text"
              name="Room_ID"
              placeholder="Room owner ID"
              required
              onInput={(event) => setOwner(event.target.value)}
            />
          </div>
        </div>
        {error && <p className="form-error-message">{error}</p>}
        {success && <p className="form-success-message">Success!</p>}
        <div className="form-btn">
          <button type="submit" className="form-btn-submit">
            <div className="form-btn-submit-title">
              {loading ? "Loading..." : "Create Room"}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoomForm;
