import axios from "axios";

import type { ActionResponse, DirectoryTypes, FunctionMap } from "@/utils/functions/admin/adminActions";

const adminActionsDirectory = async <ActionName extends DirectoryTypes>(
  action: ActionName,
  ...args: FunctionMap[ActionName]["args"]
): Promise<ActionResponse<FunctionMap[ActionName]["returnType"]>> => {
  const req = [...args];

  const path = action.split("-").join("/");

  const request: ActionResponse<FunctionMap[ActionName]["returnType"]> = await axios
    .post("/api/admin/" + path, req)
    .then((res: any) => res.data)
    .catch((err: any) => ({
      success: false,
      error: err.message,
    }));

  return request;
};

export default adminActionsDirectory;
