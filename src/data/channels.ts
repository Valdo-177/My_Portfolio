// Canales de YouTube donde Keyner trabaja como editor / camarógrafo.

export interface Channel {
  name: string;
  handle: string;
  url: string;
  channelId: string;
  avatar: string;
  roles: string[];
  description: string;
}

export const channels: Channel[] = [
  {
    name: "412 Podcast",
    handle: "@412Podcastco",
    url: "https://www.youtube.com/@412Podcastco",
    channelId: "UC9RV0dYQpMWrsfyhownehEQ",
    avatar:
      "https://yt3.googleusercontent.com/yvrlT2EBQCJuWaw_EY6CF0TdfRN_-boCS6-6V4ZyllIyIDe_CLUaRZDyIelvXsfSgbNedSkIV6I=s240-c-k-c0x00ffffff-no-rj",
    roles: ["Grabación", "Edición"],
    description: "Entre voces y llamado: fe, identidad y propósito. Grabo y edito cada episodio.",
  },
  {
    name: "Usted lo dijo",
    handle: "@Usted_lo_dijo",
    url: "https://www.youtube.com/@Usted_lo_dijo",
    channelId: "UCXpbb5CkklkClyYCPVGZdfg",
    avatar:
      "https://yt3.googleusercontent.com/-IT7RePj5Z8Bt5GdB3i9QFeNZ44-vnPB9yTGLkmPAv1v8osgAZD5MPBnTIlSnjp9QGMgNOCTTw=s240-c-k-c0x00ffffff-no-rj",
    roles: ["Edición"],
    description: "Conversaciones y episodios largos. Me encargo de la edición.",
  },
];
