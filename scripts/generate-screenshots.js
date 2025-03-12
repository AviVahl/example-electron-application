// @ts-check

import { fileURLToPath } from "node:url";
import { _electron as electron } from "playwright";

for (const colorScheme of /** @type {const} */ (["light", "dark"])) {
  const app = await electron.launch({ args: ["."], colorScheme });
  const window = await app.firstWindow();
  await window.waitForLoadState("load");
  await window.screenshot({
    type: "png",
    path: fileURLToPath(new URL(`../docs/screenshot-${colorScheme}.png`, import.meta.url)),
  });
  await app.close();
}
