import { RelatedUi } from "../../features/watch/relatedUi.js";
import { Tabs } from "../../components/tabs.js";
import { CommentsLoader } from "../../features/watch/commentsLoader.js";
import { WatchEvents } from "../../features/watch/watchEvents.js";
import { Player } from "../../features/player/player.js";
import { RelatedVideos } from "../../features/watch/relatedVideos.js";

let currentRelatedFilter = "related";

function initializeWatchPage(video, currentUser, commentsState, currentRenderToken) {
    const token = ++currentRenderToken;

    RelatedUi.updateRelatedUI(currentRelatedFilter);

    Tabs.initializeTabs();
    document.querySelector('[data-tab="videos"]')?.click();

    CommentsLoader.loadCommentsPage(video.id, commentsState, 1);

    WatchEvents.setupWatchEvents(video, currentUser, commentsState);
    Player.initialize(video);

    RelatedVideos.loadVideosByFilter(video, currentRelatedFilter);

}

export const WatchController = {
    initializeWatchPage,
    currentRelatedFilter
}