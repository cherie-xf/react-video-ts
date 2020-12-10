import React from "react"
import NightMode from "../Nightmode"
import PlaylistItems from "./PlaylistItems"
import PlaylistHeader from "../PlaylistHeader"
import StyledPlaylist from "../styles/StyledPlaylist"
interface PlaylistProps {
    videos: Array<Video>;
    activeVideo: Video;
    nightMode: boolean;
    nightModeCallback: () => void;
}

const Playlist: React.FC<PlaylistProps> = ({ videos, activeVideo, nightMode, nightModeCallback }) => {

    return (
        <StyledPlaylist>
            <NightMode nightMode={nightMode} nightModeCallback={nightModeCallback} />
            <PlaylistHeader activeVideo={activeVideo} total={videos.length} />
            <PlaylistItems videos={videos} activeVideo={activeVideo} />
        </StyledPlaylist>
    )
}
export default Playlist