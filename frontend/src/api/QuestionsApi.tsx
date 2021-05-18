import { host } from "../constant/url";
import { useGet } from "./template/useGet";
import { QuestionResponse } from "../dto/response/QuestionResponse";
import { usePost } from "./template/usePost";

export const useGetAllQuestionInfos = () =>
  useGet<QuestionResponse[]>(`${host}/questions-info`);

export const useGetAllQuestionInfoById = (questionId: any) =>
  useGet<QuestionResponse>(`${host}/questions-info/${questionId}`);

export const usePostLike = () => usePost<any, any>(`${host}/like-questions`);
export const usePostTryQuestion = () =>
  usePost<any, any>(`${host}/try-questions`);
