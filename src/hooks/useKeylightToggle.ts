import { useState, useEffect, SetStateAction, Dispatch } from "react";
import axios from "axios";
import { KeylightResp } from "../shared/types";

type ToggleKeylightResult = [boolean, () => void, boolean, string | undefined];

const useToggleKeylight = (
    setLightsAddresses: Dispatch<SetStateAction<KeylightResp[]>>,
    lightsAddresses?: KeylightResp[]
): ToggleKeylightResult => {
    const [keylightOn, setKeylightOn] = useState(false);
    const [targetUrl, setTargetUrl] = useState<string>();

    const handleToggleKeylight = () => {
        if (!lightsAddresses || !lightsAddresses.length) {
            return;
        }

        const keylightAddress = lightsAddresses[0].networkAddress;
        const lights = lightsAddresses?.[0].keyLight.optionsCall.lights;
        const on = lights[0].on ? 0 : 1;

        axios
            .put(
                "http://localhost:3001/elgato/lights",
                {
                    lights: [
                        {
                            on: lightsAddresses[0].keyLight.optionsCall
                                .lights[0].on
                                ? 0
                                : 1,
                        },
                    ],
                    targetUrl: keylightAddress,
                },
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            )
            .then(() => {
                // Update the state of the lights to reflect the new on state
                if (lightsAddresses) {
                    setLightsAddresses((lightsAddresses) => {
                        const updatedLightsAddresses = [...lightsAddresses];
                        updatedLightsAddresses[0].keyLight.optionsCall.lights[0].on =
                            on;
                        return updatedLightsAddresses;
                    });
                    setKeylightOn(Boolean(on));
                }
            })
            .catch(() => {});
    };

    useEffect(() => {
        if (lightsAddresses && lightsAddresses.length) {
            setTargetUrl(lightsAddresses[0].networkAddress);
            setKeylightOn(
                Boolean(lightsAddresses[0].keyLight.optionsCall.lights[0].on)
            );
        }
    }, [lightsAddresses]);

    return [keylightOn, handleToggleKeylight, Boolean(targetUrl), targetUrl];
};

export default useToggleKeylight;
