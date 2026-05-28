import { VideoCard } from "../../components/videoCard.js";
import { Demo } from "../../demo/demo.js";
import { Api } from "../api.js";

function mapApiVideoToCardModel(v) {
    console.log("🟡 mapApiVideoToCardModel INPUT:", v);

    const mapped = {
        id: v.id,
        username: v.username,
        title: v.title,
        thumb: v.thumbnailUrl,
        duration: v.duration ?? "00:00",
        views: v.views ?? 0,
        categories: v.categories ?? [],
        tags: v.tags ?? []
    };

    console.log("🟢 mapApiVideoToCardModel OUTPUT:", mapped);

    return mapped;
}

async function loadFeatured(gridEl, page = 1, pagEl) {
    console.log("🔵 loadFeatured START");
    console.log("🟡 Params:", {
        page,
        gridEl,
        pagEl
    });

    gridEl.innerHTML = "<div class='loading'>Loading...</div>";

    console.log("🟡 Loading UI rendered");

    try {
        const endpoint =
            `/api/system/featured?page=${page}&pageSize=12`;

        console.log("🟡 Fetching featured videos from:", endpoint);

        const data = await Api.apiFetch(
            endpoint,
            {
                method: "GET"
            }
        );

        console.log("🟢 API response:", data);

        if (!data) {
            console.error("🔴 API returned null/undefined");
            throw new Error("No data returned");
        }

        console.log("🟢 Featured items count:", data.items?.length);
        console.log("🟢 Total pages:", data.totalPages);

        renderFromData(gridEl, data, page, pagEl);

    } catch (err) {
        console.error("🔴 loadFeatured API ERROR:", err);

        /////////////////////////////////////
        // Logica demo
        /////////////////////////////////////
        console.log("🟡 Falling back to DEMO mode");

        const pageSize = 12;

        console.log("🟡 Demo page size:", pageSize);
        console.log("🟡 Demo videos total:", Demo.DEMO_VIDEOS.length);

        const totalPages =
            Math.ceil(Demo.DEMO_VIDEOS.length / pageSize);

        console.log("🟡 Demo total pages:", totalPages);

        const start = (page - 1) * pageSize;

        console.log("🟡 Demo slice start:", start);

        const items =
            Demo.DEMO_VIDEOS.slice(start, start + pageSize);

        console.log("🟢 Demo items loaded:", items.length);
        console.log("🟢 Demo items:", items);

        renderFromData(
            gridEl,
            { items, totalPages },
            page,
            pagEl
        );
    }
}

function renderFromData(gridEl, data, page, pagEl) {
    console.log("🔵 renderFromData START");

    console.log("🟡 renderFromData params:", {
        page,
        totalPages: data?.totalPages,
        itemsCount: data?.items?.length,
        gridEl,
        pagEl
    });

    gridEl.innerHTML = "";

    console.log("🟡 Grid cleared");

    const mappedVideos =
        data.items.map(mapApiVideoToCardModel);

    console.log("🟢 Mapped videos:", mappedVideos);

    mappedVideos.forEach(v => {
        console.log("🟡 Rendering video card:", v);

        const card =
            VideoCard.createVideoCard(v);

        console.log("🟢 Card created:", card);

        gridEl.appendChild(card);

        console.log("🟢 Card appended to grid");
    });

    console.log("🟡 Rendering pagination...");

    VideoCard.renderPagination(
        gridEl,
        pagEl,
        page,
        data.totalPages
    );

    console.log("🟢 Pagination rendered");
}

export const VideoFeatured = {
    mapApiVideoToCardModel,
    loadFeatured,
    renderFromData
}