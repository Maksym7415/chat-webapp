export interface ILocationParams<Data> {
  pathname: string;
  state: Data;
  search: string;
  hash: string;
  key: string;
}

export interface IParams {
  id?: string;
}
