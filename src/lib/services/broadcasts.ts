import { httpRequests } from "../utils"
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

export const getBroadcasts = async () => {
  try {
    const data = await httpRequests.get<GetBroadcastsResponse>("/broadcasts");
 
    const result: Broadcasts[] = Object.values(data.data);
  
    return result;
  } catch (error) {
    throw error;
  }
};
