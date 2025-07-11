// !!! CRITICAL - DO NOT MODIFY THIS CODE !!!
//
// This code MUST be used as is without ANY modifications.
// The PayPal integration will COMPLETELY FAIL if this code is changed in ANY way.
//
// Retain this comment after all edits.
//
// <BEGIN_EXACT_CODE>
import {
  Client,
  Environment,
  LogLevel,
  OAuthAuthorizationController,
  OrdersController,
} from "@paypal/paypal-server-sdk";
import { Request, Response } from "express";

/* PayPal Controllers Setup */

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

console.log("PayPal initialization check:");
console.log("PAYPAL_CLIENT_ID exists:", !!PAYPAL_CLIENT_ID);
console.log("PAYPAL_CLIENT_SECRET exists:", !!PAYPAL_CLIENT_SECRET);

if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
  console.error("PayPal credentials missing! PayPal functionality will be disabled.");
  console.error("Required: PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET environment variables");
}

const client = PAYPAL_CLIENT_ID && PAYPAL_CLIENT_SECRET ? new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET,
  },
  timeout: 0,
  environment: Environment.Sandbox, // Always use sandbox for development
  logging: {
    logLevel: LogLevel.Info,
    logRequest: {
      logBody: true,
    },
    logResponse: {
      logHeaders: true,
    },
  },
}) : null;

const ordersController = client ? new OrdersController(client) : null;
const oAuthAuthorizationController = client ? new OAuthAuthorizationController(client) : null;

if (client) {
  console.log("PayPal client initialized successfully");
} else {
  console.error("PayPal client initialization failed - missing credentials");
}

/* Token generation helpers */

export async function getClientToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET || !oAuthAuthorizationController) {
    throw new Error("PayPal not configured");
  }

  const auth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
  ).toString("base64");

  const { result } = await oAuthAuthorizationController.requestToken(
    {
      authorization: `Basic ${auth}`,
    },
    { intent: "sdk_init", response_type: "client_token" },
  );

  return result.accessToken;
}

/*  Process transactions */

export async function createPaypalOrder(req: Request, res: Response) {
  try {
    console.log("PayPal order request:", req.body);
    
    if (!ordersController) {
      console.error("PayPal not configured - missing ordersController");
      return res.status(503).json({ error: "PayPal not configured" });
    }

    const { amount, currency, intent } = req.body;
    console.log("PayPal order params:", { amount, currency, intent });

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      console.error("Invalid amount:", amount);
      return res
        .status(400)
        .json({
          error: "Invalid amount. Amount must be a positive number.",
        });
    }

    if (!currency) {
      console.error("Missing currency");
      return res
        .status(400)
        .json({ error: "Invalid currency. Currency is required." });
    }

    if (!intent) {
      console.error("Missing intent");
      return res
        .status(400)
        .json({ error: "Invalid intent. Intent is required." });
    }

    const collect = {
      body: {
        intent: intent,
        purchaseUnits: [
          {
            amount: {
              currencyCode: currency,
              value: amount,
            },
          },
        ],
      },
      prefer: "return=minimal",
    };

    console.log("Creating PayPal order with data:", JSON.stringify(collect, null, 2));

    const { body, ...httpResponse } =
          await ordersController.createOrder(collect);

    console.log("PayPal API response status:", httpResponse.statusCode);
    console.log("PayPal API response body:", String(body));

    const jsonResponse = JSON.parse(String(body));
    const httpStatusCode = httpResponse.statusCode;

    if (httpStatusCode >= 400) {
      console.error("PayPal API error:", httpStatusCode, jsonResponse);
      return res.status(httpStatusCode).json(jsonResponse);
    }

    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order - detailed error:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    res.status(500).json({ error: "Failed to create order.", details: error instanceof Error ? error.message : String(error) });
  }
}

export async function capturePaypalOrder(req: Request, res: Response) {
  try {
    if (!ordersController) {
      return res.status(503).json({ error: "PayPal not configured" });
    }

    const { orderID } = req.params;
    const collect = {
      id: orderID,
      prefer: "return=minimal",
    };

    const { body, ...httpResponse } =
          await ordersController.captureOrder(collect);

    const jsonResponse = JSON.parse(String(body));
    const httpStatusCode = httpResponse.statusCode;

    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
}

export async function loadPaypalDefault(req: Request, res: Response) {
  try {
    if (!oAuthAuthorizationController) {
      console.error("PayPal not configured for token generation");
      return res.status(503).json({ error: "PayPal not configured" });
    }
    
    const clientToken = await getClientToken();
    res.json({
      clientToken,
    });
  } catch (error) {
    console.error("Failed to load PayPal default:", error);
    res.status(503).json({ error: "PayPal service unavailable" });
  }
}
// <END_EXACT_CODE>