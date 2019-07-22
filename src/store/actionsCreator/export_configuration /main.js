import * as actions from '../../actions/export_configuration' 
import { getDataObject } from '@dgtx/coreui';
import { callAPIGetDataExport, callAPICreateData, callAPIDeleteDataExport, callAPIUpdateData } from './call_api';
import { cloneDeep, isEmpty } from 'lodash';
import { showNotification } from '@dgtx/coreui';

export const getDataExport = (projectId: any) => async (dispatch: any) => {
	const data = await dispatch(callAPIGetDataExport({ projectId }));
	
		dispatch({
			type: actions.EXPORT_CONFIGURATION_GET_DATA,
			payload: {
				data: data,
				refreshPage: false
			},
			meta: {
				resource: actions.NAME_REDUCER
			}
		});
};

// deleteDataTransform
export const deleteDataExport = (exConfig: any) => async (dispatch: any) => {
	const projectId = exConfig.project_id;
	await dispatch(
		callAPIDeleteDataExport({
			id: exConfig.id,
			projectId: projectId
		})
	);
	await dispatch(getDataExport(projectId));
	dispatch({
		type: actions.EXPORT_CONFIGURATION_DELETE_DATA,
		payload: {
			exConfig
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};
export const setIsOpenAddDialog = (value) => {
	return {
		type: actions.SET_IS_OPEN_ADD_DIALOG,
		payload: {
			isOpenAdd: value
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setIsOpenViewDialog = (value) => {
	return {
		type: actions.SET_IS_OPEN_VIEW_DIALOG,
		payload: {
			isOpenView: value
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setIsOpenDelDialog = (value) => {
	return {
		type: actions.SET_IS_OPEN_DEL_DIALOG,
		payload: {
			isOpenDel: value
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};


export const setIsCloseDialog = (value) => {
	return {
		type: actions.SET_IS_CLOSE_DIALOG,
		payload: {
			isOpenAdd: value,
			isOpenView: value,
			// isOpenEdit: value,
			// config: new Config(),
			// configValidators: default_configValidator
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	};
};

export const setExportConfig = (exConfig: any) => async (dispatch: any) => {
	console.log({exConfig});
	
	dispatch({
		type: actions.SET_EXPORT_CONFIG,
		payload: {
			exConfig
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};

export const setSelectedExportConfig = (exConfig: any) => async (dispatch: any) => {
	console.log({exConfig});
	dispatch({
		type: actions.SET_SELECTED_EXPORT_CONFIG,
		payload: {
			exConfig
		},
		meta: {
			resource: actions.NAME_REDUCER
		}
	});
};
