import axios from "axios";
import { useState } from "react";

export const useHueToggle = (ip: string, username: string, lightId: string) => {
    const [hueOn, setHueOn] = useState(false);

    const handleHueButtonClick = () => {
        axios
            .put(`http://${ip}/api/${username}/lights/${lightId}/state`, {
                on: !hueOn,
            })
            .then(() => setHueOn(!hueOn))
            .catch(() => setHueOn(hueOn));
    };

    return [hueOn, handleHueButtonClick] as const;
};
