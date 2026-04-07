import { KickChannel, Streamer } from './types';

export async function getKickChannel(username: string): Promise<Streamer> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/channel?username=${username}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch channel: ${username}`);
    }

    const data: KickChannel = await response.json();

    return {
      username: data.slug,
      displayName: data.user.username,
      profilePic: data.user.profile_pic || '',
      isLive: data.livestream?.is_live || false,
      streamTitle: data.livestream?.title || '',
      streamCategory: data.livestream?.categories?.[0]?.name || '',
      viewers: data.livestream?.viewer_count || 0,
      thumbnail: data.livestream?.thumbnail?.url || ''
    };
  } catch (error) {
    console.error(`Error fetching channel ${username}:`, error);
    return {
      username,
      displayName: username,
      profilePic: '',
      isLive: false,
      streamTitle: '',
      streamCategory: '',
      viewers: 0,
      thumbnail: ''
    };
  }
}

export async function getStreamersData(usernames: string[]): Promise<Streamer[]> {
  const promises = usernames.map(username => getKickChannel(username));
  return Promise.all(promises);
}
