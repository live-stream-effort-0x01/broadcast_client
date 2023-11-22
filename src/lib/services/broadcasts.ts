
import { fetcher,fetcherGet } from "../utils/fetch";
export type Broadcasts = {
  creation_time: number;
  duration: number;
  empty_timeout: number;
  Metadata: {
    description: string;
    video_source: string;
  };
  name: string;
  sid: string;
};
type GetBroadcastsResponse = { [key: string]: Broadcasts };
export type CreateBroadcastsInput = {
  room_name: string;
  owner: string;
  description?: string;
  video_source?: string;
};

export const getBroadcasts = async () => {
  try {
    const data = await fetcherGet<GetBroadcastsResponse>("/broadcasts",{
      method: "GET",
    });
    const result: Broadcasts[] = Object.values(data);

    return result;
  } catch (error) {
   const result: Broadcasts[] =[]
   console.log(error)
   return result
   
  }
};


export const createRoom = (data: CreateBroadcastsInput) => {
  const formData = new FormData();
  formData.append("room_name", data.room_name);
  formData.append("owner", data.owner);
  formData.append("owner", data.owner);
  formData.append("description", data.description || "");
  formData.append("video_source", data.video_source || "");
 
  return fetcher("/broadcasts", {
    method: "POST",
    body: formData,
  })
    .then((res) => res as Broadcasts)
    .catch((error) => {
      throw error;
    });
};

export type inviteRoomInput = {
  room_name: any;
  identity: any;
};
export const inviteRoom  = (data: inviteRoomInput) => {
  return fetcher(`/broadcasts/invite/${data.room_name}?identity=${data.identity||'user'}`, {
    method: "GET",
  })
    .then((res) => res as Broadcasts)
    .catch((error) => {
      throw error;
    });
};

export const deleteRoom  = (room_name:any) => {
  console.log(room_name)
  return fetcher(`/broadcasts/${room_name}`, {
    method: "DELETE",
  })
    .then((res) => res as Broadcasts)
    .catch((error) => {
      throw error;
    });
};