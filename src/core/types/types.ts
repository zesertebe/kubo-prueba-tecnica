export type QueryType = {
  query: string;
  params?: any[];
};
export interface DatabaseInterface {
  query(text: string, params?: any[]): Promise<any>;
}
