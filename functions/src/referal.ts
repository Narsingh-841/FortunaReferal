import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import axios from "axios";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

// --- HubSpot API token ---
const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;

// --- Fetch & store deals from HubSpot ---
async function fetchAndStoreDeals() {
  const dealsRes = await axios.get("https://api.hubapi.com/crm/v3/objects/deals", {
    headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}` },
    params: {
      properties: "dealname,dealstage,hubspot_owner_id,createdate,service_type,notes",
      associations: "contacts",
    },
  });

  const deals = dealsRes.data.results;

  for (const deal of deals) {
    const contactId = deal.associations?.contacts?.results?.[0]?.id;
    let contactData: any = {};

    if (contactId) {
      const contactRes = await axios.get(
        `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
        {
          headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}` },
          params: { properties: "email,phone,firstname,lastname" },
        }
      );
      contactData = contactRes.data.properties;
    }

    let referrerName = "";
    if (deal.properties.hubspot_owner_id) {
      const ownerRes = await axios.get(
        `https://api.hubapi.com/crm/v3/owners/${deal.properties.hubspot_owner_id}`,
        { headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}` } }
      );
      referrerName = `${ownerRes.data.firstName || ""} ${ownerRes.data.lastName || ""}`.trim();
    }

    const referralData = {
      referrerName: referrerName || "Unknown",
      referralName: deal.properties.dealname || "",
      email: contactData.email || "",
      date: deal.properties.createdate,
      phoneNo: contactData.phone || "",
      service: deal.properties.service_type || "Not specified",
      status: deal.properties.dealstage || "",
      notes: deal.properties.notes || "-",
    };

    await db.collection("referrals").add(referralData);
    logger.info(`✅ Saved referral: ${referralData.referralName}`);
  }

  logger.info("🎉 All deals saved successfully!");
}

// --- Cloud Function Endpoint ---
export const syncHubspotDeals = onRequest(async (req, res) => {
  try {
    await fetchAndStoreDeals();
    res.send("✅ Deals synced successfully!");
  } catch (error: any) {
    logger.error("❌ Error syncing deals", error);
    res.status(500).send(error.message || "Something went wrong");
  }
});