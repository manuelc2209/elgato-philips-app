import { useEffect, useState } from "react";
import { StyledApp, StyledColumn, StyledLightsContainer } from "./styles";
import { KeylightResp } from "./shared/types";
import { Elgato, Philips } from "./components";

export const App = () => {
    const [lights, setLights] = useState<KeylightResp[]>([]);
    const socket = new WebSocket("ws://localhost:3001");

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
                <div>{`Found ${lights?.length} network device`}</div>

                {lights && (
                    <StyledLightsContainer>
                        {lights.map((light) =>
                            light.isElgato ? (
                                <Elgato
                                    lightsAddresses={lights}
                                    setLights={setLights}
                                />
                            ) : (
                                <Philips
                                    lightsAddresses={lights}
                                    setLights={setLights}
                                />
                            )
                        )}
                    </StyledLightsContainer>
                )}
            </StyledColumn>
        </StyledApp>
    );
};
