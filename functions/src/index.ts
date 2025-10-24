import { setGlobalOptions } from "firebase-functions";
import { initializeApp, cert } from "firebase-admin/app";

const serviceAccount = require("../serviceAccountKey.json");

// Global Firebase configuration

setGlobalOptions({ maxInstances: 10 });

// Export your functions
export { syncHubspotDeals } from "./referal";