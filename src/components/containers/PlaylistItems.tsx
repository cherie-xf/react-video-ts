import React from "react"
import PlaylistItem from "../PlaylistItem"
import StyledPlaylistItems from "../styles/StyledPlaylistitems"
import WithLink from "../hoc/WithLink"
interface PlaylistItemsProps {
    videos: Array<Video>;
    activeVideo: Video;
}

const PlaylistItemWithLink = WithLink(PlaylistItem);

const PlaylistItems: React.FC<PlaylistItemsProps> = ({ videos, activeVideo }) => {
    return (
        <StyledPlaylistItems>
            {
                videos.map(video => {
                    let item: Item = {
                        ...video,
                        active: video.id === activeVideo.id,
                    }

                    // return <PlaylistItem key="{video.id}" item={item} />
                    return <PlaylistItemWithLink key={video.id} item={item}/>
                })
            }
        </StyledPlaylistItems>
    )
}

export default PlaylistItems