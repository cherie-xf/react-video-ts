import React from "react"
import StyledNightmode from "./styles/StyledNightmode"

interface NightModeProps {
    nightMode: boolean;
    nightModeCallback: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NightMode: React.FC<NightModeProps> = ({ nightMode, nightModeCallback }) => {

    return (
        <StyledNightmode>
            Nightmode
            <label className="switch">
                <input type="checkbox" checked={!!nightMode} onChange={nightModeCallback} />
                <span className="slider round"></span>
            </label>
        </StyledNightmode>
    )
}

export default NightMode