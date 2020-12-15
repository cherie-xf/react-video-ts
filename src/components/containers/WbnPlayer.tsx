import React, { useState, useEffect } from "react"
import { RouteComponentProps } from 'react-router';

import Video from "../video"
import Playlist from "./Playlist"
import { ThemeProvider } from "styled-components"
import StyledWbnPlayer from "../styles/StyledWbnPlayer"

const theme = {
    bgcolor: "#353535",
    bgcolorItem: "#414141",
    bgcolorItemActive: "#405c63",
    bgcolorPlayed: "#5264ed",
    color: "#fff",
    border: "none",
    borderPlayer: "none"
}

const themeLight = {
    bgcolor: "#fff",
    bgcolorItem: "#fff",
    bgcolorItemActive: "#80a7b1",
    bgcolorPlayed: "#7d9979",
    color: "#353535",
    border: "1px solid #353535",
    borderPlayer: "none"
}

interface MatchParams {
    activeVideo: string;
    duration: string;
}

interface LocationState {
    autoplay: boolean;
}
interface SavedState {
    activeVideo: Video,
    nightMode: boolean

}
interface WbnPlayerProps extends RouteComponentProps<MatchParams, any, LocationState> {

}


const WbnPlayer: React.FC<WbnPlayerProps> = ({ match, history, location }) => {

    const vString = (document.querySelector('[name="videos"]') as HTMLInputElement).value;
    const resObj = JSON.parse(vString);
    const playlistName = resObj.playlistId;

    // get saved data from localstage

    const localString: string | null = playlistName ? localStorage.getItem(`${playlistName}`) : null;
    const savedState: SavedState = localString ? JSON.parse(localString) : null

    let fackevideos: Array<Video> = resObj.playlist;
    fackevideos = fackevideos.map(video => ({ ...video, url: video.video }))

    const [nightMode, setNightMode] = useState(savedState ? savedState.nightMode : true)
    const [autoplay, setAutoplay] = useState(false)
    const [videos, setVideos] = useState<Array<Video>>(fackevideos)
    const [activeVideo, setActiveVideo] = useState<Video>(videos[0])

    useEffect(() => {
        const videoId = match.params.activeVideo;
        if (videoId) {
            const newIdx = videos.findIndex(video => video.id === videoId)
            if (newIdx !== -1 && activeVideo.id !== videos[newIdx].id) {
                setActiveVideo(videos[newIdx])
                location.state?.autoplay && setAutoplay(location.state.autoplay)
                console.log("get video id from pathname", newIdx)
            }

        } else {
            // get from localstorage
            if (savedState?.activeVideo) {
                const activeIdx = videos.findIndex(video => video.id === savedState.activeVideo.id)
                if (activeIdx !== -1) {
                    setActiveVideo(videos[activeIdx])
                    history.push({
                        pathname: `/${videos[activeIdx].id}`,
                    })
                    console.log("get activeIdx from localstorage", activeIdx)
                }
            } else {
                history.push({
                    pathname: `/${activeVideo.id}`,
                })

            }
        }
    }, [history, videos, activeVideo.id, match.params.activeVideo, location.state, savedState])

    // set locat storage
    useEffect(() => {
        localStorage.setItem(`${playlistName}`, JSON.stringify({ activeVideo: activeVideo, nightMode: nightMode }))
    }, [videos, activeVideo, nightMode, playlistName])


    const endCallback = (): void => {
        const currentIdx = videos.findIndex(video => video.id === activeVideo.id)
        const nextIdx = currentIdx === videos.length - 1 ? 0 : currentIdx + 1

        history.push({
            pathname: `${videos[nextIdx].id}`
        })
    }
    // add played to current progress video
    const progressCallback: (state: {
        played: number;
        playedSeconds: number;
        loaded: number;
        loadedSeconds: number;
    }) => void = state => {
        if (state.playedSeconds > 10 && state.playedSeconds < 11) {
            setVideos(pre => pre.map(video => video.id === activeVideo.id ? { ...video, played: true } : video))
        }
    }

    const nightModeCallback = (): void => {
        setNightMode(pre => !pre)
    }

    return (
        <ThemeProvider theme={nightMode ? theme : themeLight}>
            {videos?.length ?
                <StyledWbnPlayer>
                    <Video video={activeVideo} autoplay={autoplay}
                        endCallback={endCallback}
                        progressCallback={progressCallback}
                    />
                    <Playlist videos={videos}
                        activeVideo={activeVideo}
                        nightMode={nightMode}
                        nightModeCallback={nightModeCallback} />

                </StyledWbnPlayer>
                : null}

        </ThemeProvider>
    )
}

export default WbnPlayer