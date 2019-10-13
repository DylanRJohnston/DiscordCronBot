import https from "https";

export interface Event {
  webhookId: string;
  webhookToken: string;
  payload: {
    content: string;
  };
}

const post = (url: string, body: unknown) =>
  new Promise((res, rej) => {
    const payload = JSON.stringify(body);

    const req = https.request(url, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    req.on("error", rej);
    req.on("data", res);

    req.write(payload);
    req.end();
  });

export const main = async ({ webhookToken, webhookId, payload }: Event) =>
  post(
    ["https://discordapp.com", "api", "webhooks", webhookId, webhookToken]
      .join("/")
      .concat("?wait=true"),
    payload
  );
