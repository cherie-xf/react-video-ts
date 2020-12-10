import React from "react"
import PlaylistItems from "./containers/PlaylistItems"
import StyledPlaylistItem from "./styles/StyledPlaylistItem"

interface PlaylistItemProps {
    item: Item
}


const PlaylistItem: React.FC<PlaylistItemProps> = ({item}) => {
    return (
        <StyledPlaylistItem active={item.active} played={item.played} >
            <div className="wbn-player__video-nr">{item.num}</div>
            <div className="wbn-player__video-name">{item.title}</div>
            <div className="wbn-player__video-time">{item.duration}</div>
        </StyledPlaylistItem>
    )
}

export default PlaylistItem