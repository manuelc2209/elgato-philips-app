import { useHueToggle } from "./hooks/useHueToggle";
import useToggleKeylight from "./hooks/useKeylightToggle";
import { useLightsAddresses } from "./hooks/useLightsAddresses";
import { StyledApp, StyledColumn } from "./styles";

export const App = () => {
    const { lightsAddresses, setLightsAddresses } = useLightsAddresses();
    const [keylightOn, toggleKeylight] = useToggleKeylight(
        setLightsAddresses,
        lightsAddresses
    );
    const [hueOn, toggleHue] = useHueToggle("", "", "");

    return (
        <StyledApp>
            <StyledColumn>
                {lightsAddresses && (
                    <div>{`Found ${lightsAddresses?.length} network device`}</div>
                )}
                <div>
                    <button
                        onClick={toggleKeylight}
                        disabled={!lightsAddresses?.length}
                    >
                        {keylightOn ? "Turn off Keylights" : "Turn on Keylight"}{" "}
                    </button>
                    <button
                        onClick={toggleHue}
                        disabled={!lightsAddresses?.length}
                    >
                        {hueOn ? "Turn on Hue lights" : "Turn off Hue light"}
                    </button>
                </div>
                {lightsAddresses && (
                    <div>
                        {lightsAddresses?.map((entry) => (
                            <div>{entry.networkAddress}</div>
                        ))}
                    </div>
                )}
            </StyledColumn>
        </StyledApp>
    );
};
