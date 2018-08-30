import { ThunkAction } from "redux-thunk";
import { Store } from "./store";
import { AnyAction } from "redux";

export const createMouseHoverThunk: ThunkAction<void, Store, {}, AnyAction> = (dispatch, getStore) => {
	// store.
}