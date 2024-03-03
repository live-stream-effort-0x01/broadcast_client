import { fetcher, fetcherGet } from "../utils/fetch";

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
    const response: Response = await fetcherGet("/broadcasts", {
      method: "GET",
    });
    const responseData = await response.json();
    console.log(responseData);
    const result: Broadcasts[] = Object.values(responseData);

    return result;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of error
  }
};

export const createBroadcast = async () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found in sessionStorage.");
  }

  const url = new URL("/broadcasts", import.meta.env.VITE_API_BASE_URL);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomID: "rooxxxx",
      roomName: "thuy51",
      Owner: "thuy",
      roomSid: "thuy",
      user_id: 1
    }),
  };

  try {
    const response = await fetcher(url.toString(), requestOptions);
    return response;
  } catch (error) {
    throw new Error(`Error creating broadcast: ${error}`);
  }
};

export type InviteRoomInput = {
  room_name: any;
  identity: any;
};

export const inviteRoom = (data: InviteRoomInput) => {
  return fetcher(`/broadcasts/invite/${data.room_name}?identity=${data.identity || 'user'}`, {
    method: "GET",
  })
    .then((res) => res as Broadcasts)
    .catch((error) => {
      throw error;
    });
};

export const deleteRoom = (room_name: any) => {
  console.log(room_name);
  return fetcher(`/broadcasts/${room_name}`, {
    method: "DELETE",
  })
    .then((res) => res as Broadcasts)
    .catch((error) => {
      throw error;
    });
};
