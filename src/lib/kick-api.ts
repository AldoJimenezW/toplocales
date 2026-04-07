import { KickChannel, Streamer } from './types';

export async function getKickChannel(username: string): Promise<Streamer> {
  try {
    const response = await fetch(`https://kick.com/api/v2/channels/${username}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://kick.com',
        'Origin': 'https://kick.com'
      },
      next: { revalidate: 30 }
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
      streamTitle: data.livestream?.session_title || '',
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
