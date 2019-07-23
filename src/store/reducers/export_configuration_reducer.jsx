import * as actions from '../actions/export_configuration';
import { cloneDeep } from 'lodash';
import ExConfig from '../../views/export_configuration/components/Models/ExConfig';
const initialState = {
	pending: false,
	error: false,
	success: false,
	isOpenAdd: false,
	isOpenView: false,
	isOpenDel: false,
	exConfig: new ExConfig()
};

export default {
	name: actions.NAME_REDUCER,
	reducer: (state = { ...cloneDeep(initialState) }, { type, payload }: any): any => {
		switch (type) {
			case actions.EXPORT_CONFIGURATION_GET_DATA:
			case actions.EXPORT_CONFIGURATION_CREATE_DATA:
			case actions.EXPORT_CONFIGURATION_DELETE_DATA:
			case actions.SET_SELECTED_EXPORT_CONFIG:
			case actions.SET_EXPORT_CONFIG:
			case actions.SET_IS_OPEN_ADD_DIALOG:
			case actions.SET_IS_OPEN_VIEW_DIALOG:
			case actions.SET_IS_OPEN_DEL_DIALOG:
			case actions.SET_IS_CLOSE_DIALOG:
				return {
					...state,
					...payload
				};
			case actions.EXPORT_CONFIGURATION_UNMOUNT:
				return cloneDeep(initialState);
			default:
				return state;
		}
	}
};
