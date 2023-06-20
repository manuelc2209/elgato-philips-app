import React from "react";
import { ElgatoProps } from "./types";
import { nanoid } from "nanoid";
import { StyledBody, StyledElgato } from "./styles";

export const Elgato: React.FC<ElgatoProps> = ({
    availableLights,
    handleElgatoLightToggle,
    lightsAddresses,
    keyLightOn,
}) => {
    if (!availableLights?.elgato) {
        return <></>;
    }

    return (
        <StyledElgato>
            <span>Elgato Lights</span>
            {availableLights.elgato.map((entry) => (
                <StyledBody key={nanoid()}>
                    <span>{entry.networkAddress}</span>
                    <button
                        onClick={handleElgatoLightToggle}
                        disabled={!lightsAddresses?.length}
                    >
                        {keyLightOn ? "Turn off Keylights" : "Turn on Keylight"}
                    </button>
                </StyledBody>
            ))}
        </StyledElgato>
    );
};
