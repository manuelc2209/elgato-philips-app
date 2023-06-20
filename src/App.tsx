import { Elgato, Philips } from "./components";
import { useHueToggle } from "./hooks/useHueToggle";
import useToggleKeylight from "./hooks/useKeylightToggle";
import { useLightsAddresses } from "./hooks/useLightsAddresses";
import { StyledApp, StyledColumn, StyledLightsContainer } from "./styles";

export const App = () => {
    const { lightsAddresses, setLightsAddresses } = useLightsAddresses();
    const {
        keyLightOn,
        handleElgatoLightToggle,
        handlePhilipsLightToggle,
        availableLights,
    } = useToggleKeylight(setLightsAddresses, lightsAddresses);
    const [hueOn, toggleHue] = useHueToggle("", "", "");

    return (
        <StyledApp>
            <StyledColumn>
                {lightsAddresses && (
                    <div>{`Found ${lightsAddresses?.length} network device`}</div>
                )}

                {lightsAddresses && (
                    <StyledLightsContainer>
                        <Elgato
                            availableLights={availableLights}
                            handleElgatoLightToggle={handleElgatoLightToggle}
                            lightsAddresses={lightsAddresses}
                            keyLightOn={keyLightOn}
                        />
                        <Philips
                            availableLights={availableLights}
                            handlePhilipsLightToggle={handlePhilipsLightToggle}
                            lightsAddresses={lightsAddresses}
                            keyLightOn={keyLightOn}
                        />
                    </StyledLightsContainer>
                )}
            </StyledColumn>
        </StyledApp>
    );
};
