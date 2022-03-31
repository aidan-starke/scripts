import fs from "fs";
import pinataSdk from "@pinata/sdk";
const pinata = pinataSdk('API_KEY', 'API_SECRET_KEY');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
for (let i = 0; i <= 116; i++) {
  fs.readFile(`pins/pin${i}.json`, "utf-8", async (err, data) => {
    if (err) return console.log('err', err.message)

    const pin = JSON.parse(data)

    console.log('pin', pin)

    await pinata.pinByHash(pin.hash, {pinataMetadata: pin.metadata})
      .then(result => console.log(result))
      .catch(err => console.log(err));

  })
  await sleep(5000)
}
}

main().then(() => console.log('pinned')).catch(err => console.log(err))