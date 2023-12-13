import { KeylightResp } from "../../shared/types";

export interface PhilipsProps {
    lightsAddresses: KeylightResp[];
    setLights: (value: React.SetStateAction<KeylightResp[]>) => void;
}
