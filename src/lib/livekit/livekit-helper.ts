import { Room } from "livekit-client";
export const state = {
  isFrontFacing: false,
  encoder: new TextEncoder(),
  decoder: new TextDecoder(),
  defaultDevices: new Map<MediaDeviceKind, string>(),
  bitrateInterval: undefined as any,
};

export const connectRoom =  async (room: Room, token:any) =>{
  const accessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjEwNDk3NDIyOTYwLCJpc3MiOiJBUElDZDR2RUVHd3dDY2giLCJuYmYiOjE2OTg0MTI2NzQsInN1YiI6IkRpZXBUaGVWdW9uZ0h1eSIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiIxIiwicm9vbUpvaW4iOnRydWV9fQ.IwmUbFKwvPt4Q_GDRVtb23Wa5UCKjtAlhx2UTRmjy1E'
  console.log(token)
 
  room.connect(import.meta.env.VITE_LIVEKIT_URL,token).then((value) => {
    console.log("Connected to room", room.name);
    sessionStorage.setItem("roomName", room.name)

  });
};
