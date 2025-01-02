"server only";
import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway:  "gateway.pinata.cloud"
  // pinataGateway: `${process.env.NODE_ENV === "development"? "gateway.pinata.cloud": process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});
