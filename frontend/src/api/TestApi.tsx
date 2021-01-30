import { usePost } from "./template/usePost";
import { host } from "../constant/url";
import { TestRequest } from "../dto/request/TestRequest";
import { TestResponse } from "../dto/response/TestResponse";

export const useTestPostApi = () =>
  usePost<TestRequest, TestResponse>(`${host}/test`);
