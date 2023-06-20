import { KeylightResp, LightTypes } from "../../shared/types";

export interface ElgatoProps {
    availableLights?: LightTypes;
    handleElgatoLightToggle: () => void;
    lightsAddresses: KeylightResp[];
    keyLightOn: boolean;
}
