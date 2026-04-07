export interface KickChannel {
  id: number;
  slug: string;
  user: {
    id: number;
    username: string;
    profile_pic: string;
  };
  livestream: {
    id: number;
    title: string;
    is_live: boolean;
    viewer_count: number;
    thumbnail: {
      url: string;
    };
    categories: Array<{
      name: string;
    }>;
  } | null;
}

export interface Streamer {
  username: string;
  displayName: string;
  profilePic: string;
  isLive: boolean;
  streamTitle: string;
  streamCategory: string;
  viewers: number;
  thumbnail: string;
}
