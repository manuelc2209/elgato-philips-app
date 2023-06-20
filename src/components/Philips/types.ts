import { KeylightResp, LightTypes } from "../../shared/types";

export interface PhilipsProps {
    availableLights?: LightTypes;
    handlePhilipsLightToggle: () => void;
    lightsAddresses: KeylightResp[];
    keyLightOn: boolean;
}
