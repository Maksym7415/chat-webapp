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

export interface IListItem {
  id: number;
  title: string;
  value?: string;
  path?: string;
  icon?: {
    name: string;
  };
  // disabled тимчасове
  disabled?: boolean;
}
