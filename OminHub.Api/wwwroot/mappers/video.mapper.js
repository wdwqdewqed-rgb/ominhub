// /mappers/video.mapper.js

import { Config } from '../core/config.js';
import { Demo } from '../demo/demo.js';

function mapApiVideoToWatchModel(v) {
  
  return {
    id: v.id,
    title: v.title,
    description: v.description,

    src:
  typeof v.videoUrl === "string"
    ? (
        v.videoUrl.startsWith("http")
          ? v.videoUrl
          : Config.API_BASE + v.videoUrl
      )
    : Demo.VIDEO_SRC,

    thumbnail:
  typeof v.thumbnailUrl === "string"
    ? (
        v.thumbnailUrl.startsWith("http")
          ? v.thumbnailUrl
          : Config.API_BASE + v.thumbnailUrl
      )
    : "",

    duration: v.duration,
    views: v.views,
    uploadDate: v.uploadDate,

    category: v.categories?.[0] ?? null,
    tags: v.tags ?? [],

    channelId: v.channelId,
    channelName: v.channelName,

    channelAvatar:
      typeof v.channelAvatar === 'string'
        ? (
          v.channelAvatar.startsWith('http')
            ? v.channelAvatar
            : Config.API_BASE + v.channelAvatar
        )
        : Config.BASE_PATH + '/assets/default-avatar.png',

    channelVerified: v.channelVerified,
    subscribers: v.subscribers ?? 0,

    likes: v.likes ?? 0,
    dislikes: v.dislikes ?? 0,

    userReaction: v.userReaction,
    isSubscribed: v.isSubscribed
  };
}

export const VideoMapper = {
    mapApiVideoToWatchModel

}