import { useEffect, useState } from "react";
import {
    StyledApp,
    StyledColumn,
    StyledLightsContainer,
    StyledLightsLabel,
} from "./styles";
import { KeylightResp } from "./shared/types";
import { Elgato, Philips } from "./components";
import { nanoid } from "nanoid";

export const App = () => {
    const [lights, setLights] = useState<KeylightResp[]>([]);
    const socket = new WebSocket(`ws://${window.location.hostname}:3001`);

    socket.onmessage = (event) => {
        const device = JSON.parse(event.data);

        const isDuplicate = lights.some(
            (light) => light.ip[0] === device.ip[0]
        );

        if (!isDuplicate) {
            setLights((prevAddresses) => [...prevAddresses, device]);
        }
    };

    useEffect(() => {
        return () => {
            socket.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <StyledApp>
            <StyledColumn>
                <StyledLightsLabel>{`Found ${lights?.length} network device`}</StyledLightsLabel>

                {lights && (
                    <StyledLightsContainer>
                        {lights.map((light) =>
                            light.isElgato ? (
                                <Elgato
                                    lightsAddresses={lights}
                                    setLights={setLights}
                                    key={nanoid()}
                                />
                            ) : (
                                <Philips
                                    lightsAddresses={lights}
                                    setLights={setLights}
                                    key={nanoid()}
                                />
                            )
                        )}
                    </StyledLightsContainer>
                )}
            </StyledColumn>
        </StyledApp>
    );
};
