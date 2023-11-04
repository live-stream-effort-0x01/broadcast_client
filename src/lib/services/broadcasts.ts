import { httpRequests } from "../utils"
import { fetcher } from "../utils/fetch";
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
    const data = await httpRequests.get<GetBroadcastsResponse>("/broadcasts");

    const result: Broadcasts[] = Object.values(data.data);

    return result;
  } catch (error) {
    const result: Broadcasts[] = []
    console.log(error)
    return result

  }
};


export const createRoom = (data: CreateBroadcastsInput) => {
  const formData = new FormData();

  formData.append("room_name", data.room_name);
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

// export const inviteRoom = async (room:any,name:any,token:any) => {

//   try {
//     const data = await httpRequests.get(`/broadcasts/invite/${room}?identity=${name}`, {  Authorization: token });
//     return data;
//   } catch (error) {
//    const result: Broadcasts[] =[]
//    console.log(error)
//    return result

//   }
// };
export type inviteRoomInput = {
  room_name: string;
  identity: string;
  Authorization: string;

};
export const inviteRoom = (data: inviteRoomInput) => {


  return fetcher(`/broadcasts/invite/${data.room_name}?identity=${data.identity}`, {
    method: "GET",
  })
    .then((res) => res as Broadcasts)
    .catch((error) => {
      throw error;
    });
};