import { host } from "../constant/url";
import { useGet } from "./template/useGet";
import { QuestionResponse } from "../dto/response/QuestionResponse";

export const useGetAllQuestionInfos = () =>
  useGet<QuestionResponse[]>(`${host}/questions-info`);
