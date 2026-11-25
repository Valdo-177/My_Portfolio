import { site } from "@/data/site";

export interface YouTubeVideo {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  url: string;
}

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/** Últimos videos de un canal vía su feed RSS público (se revalida cada 6 h). */
export async function getLatestVideos(
  limit = 4,
  channelId: string = site.social.youtubeChannelId
): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g), (m) => m[1]);
    return entries.slice(0, limit).map((e) => {
      const id = e.match(/<yt:videoId>([^<]+)</)?.[1] ?? "";
      return {
        id,
        title: decode(e.match(/<title>([^<]+)</)?.[1] ?? ""),
        published: e.match(/<published>([^<]+)</)?.[1] ?? "",
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${id}`,
      };
    });
  } catch {
    return [];
  }
}
