import { Room } from "livekit-client";
export const state = {
  isFrontFacing: false,
  encoder: new TextEncoder(),
  decoder: new TextDecoder(),
  defaultDevices: new Map<MediaDeviceKind, string>(),
  bitrateInterval: undefined as any,
};
const linkURL = import.meta.env.VITE_LIVEKIT_URL || 'http://localhost:8080/api/v1'
export const connectRoom =  async (room: Room, token:any) =>{
  room.connect(linkURL ,token).then((value) => {
    console.log("Connected to room", room.name);
  

  });
};
