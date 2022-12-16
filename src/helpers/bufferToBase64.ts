/* eslint-disable @typescript-eslint/restrict-plus-operands */
export const bufferToBase64 = (ArrayBuffer: [], fileName: string) => {
  const typedArray: any = new Uint8Array(ArrayBuffer);
  const stringChar = typedArray.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '');
  const base64 = window.btoa(stringChar);
  return base64;
};