export interface IHttpError {
  status: number;
  statusCode: number;
  message: string;
  errors?: string[];
}
