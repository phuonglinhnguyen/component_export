import * as React from 'react';
import { PageDecorator, getDataObject } from '@dgtx/coreui';
import { compose } from 'recompose';
import ExportComponent from '../components/export_component';
import {
	getData,
	unmount,
	createDataExport,
	deleteDataExport,
	setIsOpenAddDialog,
	setIsOpenViewDialog,
	setIsCloseDialog,
	setSelectedExportConfig,
	setIsOpenDelDialog,
	setExportConfig,
	updateDataExport,
	setIsOpenEditDialog,
	setConfigValidator
} from '../../../store/actionsCreator/export_configuration';
import Reducer from '../../../store/reducers/export_configuration_reducer';
import * as constant from '../../../store/actions/export_configuration';
interface LayoutDefautProps {
	classes?: any,
	theme?: any,
	getData?: any
}
class ExportConfigurationPage extends React.Component<LayoutDefautProps, any> {
	componentWillMount = () => {
		const { getData, match } = this.props;
		const projectId = getDataObject('params.projectid', match);
		getData(projectId);
	};

	componentWillUnmount = () => {
		const { unmount = () => null } = this.props;
		unmount()
	};

	render() {
		const { data, match, getData = () => null } = this.props;
		const projectId = getDataObject('params.projectid', match);

		return (
			<ExportComponent
				data={data}
				projectId={projectId}
				constant={constant}
				getData={getData}
				{...this.props}
			/>
		);
	}
}

const resources = [ Reducer ];
export default compose(
	PageDecorator({
		resources,
		actions: {
			getData,
			unmount,
			createDataExport,
			setIsOpenAddDialog,
			setIsCloseDialog,
			setIsOpenViewDialog,
			setSelectedExportConfig,
			setIsOpenDelDialog,
			setExportConfig,
			deleteDataExport,
			updateDataExport,
			setIsOpenEditDialog,
			setConfigValidator
		},
		mapState: (state: any) => ({
			data: getDataObject(`resources.${constant.NAME_REDUCER}.data`, state.core) || [],
			pending: getDataObject(`resources.${constant.NAME_REDUCER}.data.pending`, state.core),
			success: getDataObject(`resources.${constant.NAME_REDUCER}.data.success`, state.core),
			refreshPage: getDataObject(`resources.${constant.NAME_REDUCER}.data.refreshPage`, state.core),
			data: getDataObject(`resources.${constant.NAME_REDUCER}.data`, state.core) || [],
			exConfig: getDataObject(`resources.${constant.NAME_REDUCER}.data.exConfig`, state.core),
			isOpenAdd: getDataObject(`resources.${constant.NAME_REDUCER}.data.isOpenAdd`, state.core),
			isOpenEdit: getDataObject(`resources.${constant.NAME_REDUCER}.data.isOpenEdit`, state.core),
			isOpenView: getDataObject(`resources.${constant.NAME_REDUCER}.data.isOpenView`, state.core),
			isOpenDel: getDataObject(`resources.${constant.NAME_REDUCER}.data.isOpenDel`, state.core),
			exportConfigValidators: getDataObject(`resources.${constant.NAME_REDUCER}.data.exportConfigValidators`, state.core),
			exportConfigValidators_fields: getDataObject(`resources.${constant.NAME_REDUCER}.data.exportConfigValidators_fields`, state.core)
		})
	})
)(ExportConfigurationPage);
