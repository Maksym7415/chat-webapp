const bufferToBase64 = (ArrayBuffer: [], fileName: string) => {
  const typedArray: any = new Uint8Array(ArrayBuffer);
  // const stringChar = String.fromCharCode.apply(null, typedArray);
  const stringChar = typedArray.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '');
  const base64 = window.btoa(stringChar);
  console.log(base64);
  return base64;
};
