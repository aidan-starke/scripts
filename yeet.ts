// const toHexString = (num: number): string => {
//   return `${num}: 0x${num.toString(16)}`
// }
//
// console.log(toHexString(21337))

export {}

// let tokenIdsRaw = "[[56,34,0], [12,13,14], [53,32,0]]"
// tokenIdsRaw = tokenIdsRaw.slice(tokenIdsRaw.indexOf("[") + 1, tokenIdsRaw.lastIndexOf("]"))
//
// const tokenIds = tokenIdsRaw.split("[").filter(Boolean).map((tokenIdRaw) => {
//   const tokenIdArray = tokenIdRaw.split(",")
//   return `${tokenIdArray[0]}_${tokenIdArray[1]}_${tokenIdArray[2].replace("]", "")}`
// })
//
// console.log({tokenIds})

import { cvmToAddress } from "@cennznet/types/utils";

const cvm = cvmToAddress("0x699aC2aedF058e76eD900FCc8cB31aB316B35bF2")
// const cvm = cvmToAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

console.log({cvm})

