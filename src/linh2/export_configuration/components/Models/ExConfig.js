class ExConfig {
	constructor() {
		this.name = '';
		this.active = true;
		this.cron_trigger = '';
		this.project_id = '';
		this.collect_export_option = {
			type: 'DOC',
			number_of_files: 'one'
		};
		this.export_format = [];
	}
}

export default ExConfig;
