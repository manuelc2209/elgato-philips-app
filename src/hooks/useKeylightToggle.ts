import { useState, useEffect, SetStateAction, Dispatch } from "react";
import axios from "axios";
import {
    KeylightResp,
    LightTypes,
    ToggleKeylightResult,
} from "../shared/types";

const useToggleKeylight = (
    setLightsAddresses: Dispatch<SetStateAction<KeylightResp[]>>,
    lightsAddresses?: KeylightResp[]
): ToggleKeylightResult => {
    const [keylightOn, setKeylightOn] = useState<boolean>(false);
    const [availableLights, setAvailableLights] = useState<
        LightTypes | undefined
    >();

    const handleElgatoLightToggle = () => {
        if (!lightsAddresses || lightsAddresses.length === 0) {
            return;
        }

        const elgatoLights = lightsAddresses.filter((light) => light.isElgato);

        const { networkAddress, keyLight } = elgatoLights[0];
        const { lights } = keyLight.optionsCall;
        setKeylightOn(lights[0].on === 0);
        const on = keylightOn ? 0 : 1;

        axios
            .put(
                `http://localhost:3001/elgato/lights`,
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
            .then((lightsAddresses) => {
                if (lightsAddresses) {
                    setKeylightOn(!keylightOn);
                }
            })
            .catch(() => {});
    };

    useEffect(() => {
        if (lightsAddresses && lightsAddresses.length > 0) {
            const elgatoLights = lightsAddresses.filter(
                (light) => light.isElgato
            );
            const philipsLights = lightsAddresses.filter(
                (light) => light.isPhilips
            );
            const lights = {
                elgato: elgatoLights,
                philips: philipsLights,
            };

            setAvailableLights({ ...lights });
        }
    }, [lightsAddresses]);

    return {
        keyLightOn: keylightOn,
        handleElgatoLightToggle,
        handlePhilipsLightToggle: () => undefined,
        availableLights,
    };
};

export default useToggleKeylight;
