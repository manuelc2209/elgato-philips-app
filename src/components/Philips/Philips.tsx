import React from "react";
import { PhilipsProps } from "./types";
import { nanoid } from "nanoid";
import { StyledBody, StyledPhilips } from "./styles";

export const Philips: React.FC<PhilipsProps> = ({
    lightsAddresses,
    setLights,
}) => {
    if (!lightsAddresses) {
        return <></>;
    }

    const filterForPhilipsLights = lightsAddresses.filter(
        (light) => light.isPhilips
    );

    return (
        <StyledPhilips>
            <span>Philips Lights</span>
            {filterForPhilipsLights?.map((entry) => (
                <StyledBody key={nanoid()}>
                    <span>{entry.networkAddress}</span>
                    <button
                        onClick={() => console.log("click")}
                        disabled={!filterForPhilipsLights?.length}
                    >
                        {1 ? "Turn off Hue" : "Turn on Hue"}
                    </button>
                </StyledBody>
            ))}
        </StyledPhilips>
    );
};
