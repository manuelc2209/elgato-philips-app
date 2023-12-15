import React, { useState } from "react";
import { ElgatoProps } from "./types";
import { nanoid } from "nanoid";
import { StyledBody, StyledElgato } from "./styles";
import axios from "axios";
import { KeylightResp } from "../../shared/types";

export const Elgato: React.FC<ElgatoProps> = ({
    lightsAddresses,
    setLights,
}) => {
    const [keylightOn, setKeylightOn] = useState<boolean>(false);
    if (!lightsAddresses) {
        return <></>;
    }

    const filterForElgatoLights = lightsAddresses.filter(
        (light) => light.isElgato
    );

    const handleElgatoLightToggle = (entry: KeylightResp) => {
        const { networkAddress, keyLight } = entry;
        const { lights } = keyLight.optionsCall;
        setKeylightOn(lights[0].on === 0);
        const on = keylightOn ? 0 : 1;

        axios
            .put(
                `http://${window.location.hostname}:3001/elgato/lights`,
                {
                    lights: [{ on: on }],
                    targetUrl: networkAddress,
                },
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            )
            .then(() => {
                console.log("networkAddress", networkAddress);
                setLights((prevAddresses) => [
                    ...prevAddresses.map((light) =>
                        light.networkAddress === entry.networkAddress
                            ? {
                                  ...light,
                                  keyLight: {
                                      ...light.keyLight,
                                      optionsCall: {
                                          ...light.keyLight.optionsCall,
                                          lights: [{ on }],
                                      },
                                  },
                              }
                            : light
                    ),
                ]);
            })
            .catch(() => {});
    };

    return (
        <StyledElgato>
            <span>Elgato Lights</span>
            {filterForElgatoLights.map((entry) => (
                <StyledBody key={nanoid()}>
                    <span>{entry.networkAddress}</span>
                    <button
                        onClick={() => handleElgatoLightToggle(entry)}
                        disabled={!filterForElgatoLights?.length}
                    >
                        {entry.keyLight.optionsCall.lights[0].on === 1
                            ? "Turn off Keylights"
                            : "Turn on Keylight"}
                    </button>
                </StyledBody>
            ))}
        </StyledElgato>
    );
};
