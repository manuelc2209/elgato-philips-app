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
