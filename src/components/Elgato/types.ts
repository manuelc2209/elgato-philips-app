import { KeylightResp } from "../../shared/types";

export interface ElgatoProps {
    lightsAddresses: KeylightResp[];
    setLights: (value: React.SetStateAction<KeylightResp[]>) => void;
}
