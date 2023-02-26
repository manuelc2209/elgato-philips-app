const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

const mdns = require("mdns-js");
const axios = require("axios");
const bodyParser = require("body-parser");

// Allow all CORS requests
app.use(cors());
app.use(bodyParser.json());

async function startDiscovery(ip) {
    return new Promise((resolve, reject) => {
        const browser = mdns.createBrowser(mdns.tcp("http"));

        browser.on("ready", () => {
            console.log(`MDNS browser ready for ${ip}`);
        });

        let foundDevices = [];

        browser.on("update", async (service) => {
            const { addresses, fullname, port } = service;

            const isElgato = fullname.includes("Elgato");
            const isPhilips = fullname.includes("Philips");

            if (isElgato || isPhilips) {
                let keyLight;

                if (isElgato) {
                    try {
                        // Grab our keylight's settings, info, and current options
                        let settingsCall = await axios
                            .get(
                                `http://${addresses}:${port}/elgato/lights/settings`
                            )
                            .then((res) => res.data);

                        let infoCall = await axios
                            .get(
                                `http://${addresses}:${port}/elgato/accessory-info`
                            )
                            .then((res) => res.data);

                        let optionsCall = await axios
                            .get(`http://${addresses}:${port}/elgato/lights`)
                            .then((res) => res.data);

                        keyLight = {
                            settingsCall,
                            infoCall,
                            optionsCall,
                        };
                    } catch (e) {
                        console.error(e);
                    }
                }

                foundDevices.push({
                    isElgato,
                    isPhilips,
                    ip: addresses,
                    networkAddress: `${addresses}:${port}`,
                    keyLight,
                });
            }
        });

        browser.on("error", (err) => {
            console.error(err);
            reject(err);
        });

        browser.discover();

        setTimeout(() => {
            browser.stop();
            resolve(foundDevices);
        }, 5000);
    });
}

async function discoverDevices() {
    const results = await startDiscovery(`192.168.1.0`);
    return [...new Set(results)];
}

app.get("/devices", async (req, res) => {
    const devices = await discoverDevices();
    res.json(devices);
});

app.put("/elgato/lights", (req, res) => {
    // Clone the original request and modify the headers
    const clonedReq = {
        method: req.method,
        url: `http://${req.body.targetUrl}/elgato/lights`,
        data: req.body,
        headers: { ...req.headers },
    };

    axios(clonedReq)
        .then((response) => {
            res.sendStatus(response.status);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

process.on("SIGINT", () => {
    process.exit();
});
