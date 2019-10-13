import https from "https";

export interface Event {
  webhookId: string;
  webhookToken: string;
  payload: {
    content: string;
  };
}

const post = (url: string, body: unknown) =>
  new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { method: "POST", headers: { "Content-Type": "application/json" } },
      response => {
        response.setEncoding("utf8");
        response.on("data", resolve);

        response.on("end", () => {
          if (response.statusCode !== 200) {
            reject(
              Error(`API responded with statuscode ${response.statusCode}`)
            );
          }
        });
      }
    );

    req.on("error", reject);

    req.write(JSON.stringify(body));
    req.end();
  });

export const main = async ({ webhookToken, webhookId, payload }: Event) =>
  post(
    ["https://discordapp.com", "api", "webhooks", webhookId, webhookToken]
      .join("/")
      .concat("?wait=true"),
    payload
  );
