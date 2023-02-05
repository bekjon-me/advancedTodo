import { Action } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export const logger =
  (store: any) => (next: Dispatch<any>) => (action: Action) => {
    console.group(action.type);
    console.info("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
  };
