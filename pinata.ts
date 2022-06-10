import fs from "fs";
import pinataSdk from "@pinata/sdk";

// aidan.starke@centrality.ai
// const pinata = pinataSdk('4da6a75d1a04694efd83', '7baf1ea3802d3a68365b5a33a78bd75357029473eaa935ff65680d019eb75ea1');

// aidan@starkemedia.com
// const pinata = pinataSdk('6a763cf85533d2612a3f', '28ea0e620ba973859007d582ea1825f578b25540b91e705b33f46df2ab1352c5');

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

    //@ts-ignore
    await pinata.unpin(pin.hash)
      .then(result => console.log(result))
      .catch(err => console.log(err));

  })
  await sleep(1000)
}
}

main().then(() => console.log('UNpinned')).catch(err => console.log(err))