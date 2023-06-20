import axios from "axios";
import { useState } from "react";
import { KeylightResp } from "../shared/types";

export const useLightsAddresses = () => {
    const [lightsAddresses, setLightsAddresses] = useState<KeylightResp[]>([]);

    axios
        .get("http://localhost:3001/devices")
        .then((data) => setLightsAddresses(data.data));

    return { lightsAddresses, setLightsAddresses };
};
