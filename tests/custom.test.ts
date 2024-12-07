import { ScrapybaraClient } from "../src";

describe("test", () => {
    it("default", async () => {
        const client = new ScrapybaraClient({
            authorization: "",
        });
        const instance = await client.start();
        await instance.browser.start();
    });
});
