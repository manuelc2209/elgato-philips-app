import axios from "axios";
import { useEffect, useState } from "react";
import { KeylightResp } from "../shared/types";

export const useLightsAddresses = () => {
    const [lightsAddresses, setLightsAddresses] = useState<KeylightResp[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/devices")
            .then((data) => setLightsAddresses(data.data));
    }, []);

    return { lightsAddresses, setLightsAddresses };
};
