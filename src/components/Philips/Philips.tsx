import React from "react";
import { PhilipsProps } from "./types";
import { nanoid } from "nanoid";
import { StyledBody, StyledPhilips } from "./styles";

export const Philips: React.FC<PhilipsProps> = ({
    availableLights,
    handlePhilipsLightToggle,
    lightsAddresses,
    keyLightOn,
}) => {
    if (!availableLights?.philips) {
        return <></>;
    }

    return (
        <StyledPhilips>
            <span>Philips Lights</span>
            {availableLights?.philips?.map((entry) => (
                <StyledBody key={nanoid()}>
                    <span>{entry.networkAddress}</span>
                    <button
                        onClick={handlePhilipsLightToggle}
                        disabled={!lightsAddresses?.length}
                    >
                        {keyLightOn ? "Turn off Hue" : "Turn on Hue"}
                    </button>
                </StyledBody>
            ))}
        </StyledPhilips>
    );
};
