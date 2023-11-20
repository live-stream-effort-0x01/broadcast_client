import { Room } from "livekit-client";
export const state = {
  isFrontFacing: false,
  encoder: new TextEncoder(),
  decoder: new TextDecoder(),
  defaultDevices: new Map<MediaDeviceKind, string>(),
  bitrateInterval: undefined as any,
};

export const connectRoom =  async (room: Room, token:any) =>{
  room.connect(import.meta.env.VITE_LIVEKIT_URL,token).then((value) => {
    console.log("Connected to room", room.name);
  

  });
};
