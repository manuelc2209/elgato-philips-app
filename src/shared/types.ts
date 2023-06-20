export interface KeylightResp {
    isElgato: boolean;
    isPhilips: boolean;
    ip: string[];
    networkAddress: string;
    keyLight: {
        infoCall: any;
        optionsCall: any;
        settingsCall: any;
    };
}

export type LightTypes = {
    elgato?: KeylightResp[];
    philips?: KeylightResp[];
};

export type ToggleKeylightResult = {
    keyLightOn: boolean;
    handleElgatoLightToggle: () => void;
    handlePhilipsLightToggle: () => void;
    availableLights?: LightTypes;
};
