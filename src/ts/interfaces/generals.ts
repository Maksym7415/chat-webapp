export interface LocationParams<Data> {
  pathname: string;
  state: Data;
  search: string;
  hash: string;
  key: string;
}

interface Params {
  id?: string;
}
