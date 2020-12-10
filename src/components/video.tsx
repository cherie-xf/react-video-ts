import React from "react"
import ReactPlayer from "react-player"
import StyledVideo from "./styles/StyledVideo"
import StyledVideoWrapper from "./styles/StyledVideoWrapper"

interface VideoProps {
    video: Video;
    autoplay: boolean;
    endCallback: () => void;
    progressCallback: (state: {
        played: number;
        playedSeconds: number;
        loaded: number;
        loadedSeconds: number;
        }) => void;
}

const Video: React.FC<VideoProps> = ({ video, autoplay, endCallback, progressCallback }) => {
    return (
        <StyledVideo>
            <StyledVideoWrapper>
                <ReactPlayer width="100%" height="100%"
                    style={{ position: "absolute", top: "0" }}
                    playing={autoplay}
                    controls={true}
                    url={video.url}
                    onEnded={endCallback}
                    onProgress={progressCallback}
                />
            </StyledVideoWrapper>
        </StyledVideo>
    )
}

export default Video