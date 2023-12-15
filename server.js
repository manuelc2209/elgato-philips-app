const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const mdns = require("mdns-js");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 3001;
let initialUniqueDeviceId = [];

app.use(cors());
app.use(bodyParser.json());

async function getElgatoInfo(addresses, port) {
    try {
        const settingsCall = await axios
            .get(`http://${addresses}:${port}/elgato/lights/settings`)
            .then((res) => res.data);

        const infoCall = await axios
            .get(`http://${addresses}:${port}/elgato/accessory-info`)
            .then((res) => res.data);

        const optionsCall = await axios
            .get(`http://${addresses}:${port}/elgato/lights`)
            .then((res) => res.data);

        return {
            settingsCall,
            infoCall,
            optionsCall,
        };
    } catch (e) {
        console.error(e);
        return null;
    }
}

function startDiscovery(ws, ip) {
    const browser = mdns.createBrowser(mdns.tcp("http"));

    browser.on("ready", () => {
        console.log(`MDNS browser ready for ${ip}`);
    });

    browser.on("update", async (service) => {
        const { addresses, fullname, port } = service;

        if (!fullname) return;

        const isElgato = fullname.includes("Elgato");
        const isPhilips = fullname.includes("Hue Bridge");

        if (isElgato || isPhilips) {
            let keyLight;

            if (isElgato) {
                keyLight = await getElgatoInfo(addresses, port);
            }

            const device = {
                isElgato,
                isPhilips,
                ip: addresses,
                networkAddress: `${addresses}:${port}`,
                keyLight,
            };

            if (!initialUniqueDeviceId.includes(device.networkAddress)) {
                initialUniqueDeviceId.push(device.networkAddress);
                ws.send(JSON.stringify(device));
            }
        }
    });

    browser.on("error", (err) => {
        console.error(err);
    });

    browser.discover();
}

wss.on("connection", (ws) => {
    console.log("WebSocket client connected");

    ws.on("close", () => {
        console.log("WebSocket client disconnected");
        initialUniqueDeviceId = [];
    });

    startDiscovery(ws, "192.168.1.0");
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

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

process.on("SIGINT", () => {
    process.exit();
});
