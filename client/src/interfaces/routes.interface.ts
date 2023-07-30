export interface Route {
  key: number;
  parent_key?: number;
  name: string;
  path: string;
  element: () => JSX.Element;
}
