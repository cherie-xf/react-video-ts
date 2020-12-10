import React from "react"
import StyledJourney from "./styles/StyledJourney"
import StyledPlaylistHeader from "./styles/StyledPlaylistHeader"

interface playlistHeaderProps {
    activeVideo: Video;
    total: number;
}

const PlaylistHeader: React.FC<playlistHeaderProps> = ({activeVideo, total}) => { return (
        <StyledPlaylistHeader>
           <p>{activeVideo.title}</p> 
           <StyledJourney>
               {activeVideo.num} / {total}
           </StyledJourney>

        </StyledPlaylistHeader>
    )
}

export default PlaylistHeader