
INSERT INTO role (name, description)
VALUES 	('Data Director', 'Role with overall corporate responsibility across the data holding. Unlikely to have permissions to the data'),
	('Data Owner/Supplier', 'Supplier and owner of the data. Both external and internal sources'),
	('Data Manager', 'Manager responsible for receiving the data from the Data Owner/Supplier. Covers Data lifecycle management.'),
	('Data User', 'Very general and high level view of anyone or anything that may want to access/have permissions to access data'),
	('Auditor', 'Audits the data/usage and roles.'),
	('Output Checker', 'Responsible for checking all outputs. Makes a decision from results if can be made ‘public’, either for general use or as an output.'),
	('Data Preparation', 'Responsible for Cleaning/Standardising/Applying basic business rules'),
	('Data Importer', 'Imports the data into reception area. Checks/assesses for Malware.'),
	('Access Control Manager', 'Agrees and sets role/data and functionality permissions. Responsible for governance process.');

INSERT INTO permission (name, description, short_name)
VALUES ('View Users', 'The user can view a list of the users', 'VIEW_USERS'),
	('Edit Users', 'The user can edit a user', 'EDIT_USERS'),
	('Add Users', 'The user can add a user', 'ADD_USERS'),
	('View Roles', 'The user can view a list of roles', 'VIEW_ROLES'),
	('Edit Roles', 'The user can edit a role', 'EDIT_ROLES'),
	('Add Roles', 'The user can add a role', 'ADD_ROLES'),
	('Delete Roles', 'The user can delete a role', 'DELETE_ROLES'),
	('View Permissions', 'The user can view a list of permissions', 'VIEW_PERMISSIONS'),
	('Edit Permissions', 'The user can edit a permission', 'EDIT_PERMISSIONS'),
	('Add Permissions', 'The user can add a permission', 'ADD_PERMISSIONS'),
	('Delete Permissions', 'The user can delete a permission', 'DELETE_PERMISSIONS'),
	('View Journeys', 'The user can view a list of journeys', 'VIEW_JOURNEYS'),
	('Edit Journeys', 'The user can edit a journey', 'EDIT_JOURNEYS'),
	('Add Journeys', 'The user can add a journey', 'ADD_JOURNEYS'),
	('Delete Journeys', 'The user can delete a journey', 'DELETE_JOURNEYS'),
	('Data Importer', 'The user can import data', 'DATA_IMPORT'),
	('Data Auditer', 'The user can audit a file', 'DATA_AUDIT');
	
INSERT into role_permission (role_id, permission_id) ( 
  SELECT role.role_id, permission.permission_id FROM role CROSS JOIN permission 
    WHERE role.name = 'Data User' AND permission.short_name in ('VIEW_USERS', 'VIEW_ROLES')
);

INSERT into role_permission (role_id, permission_id) ( 
  SELECT role.role_id, permission.permission_id FROM role CROSS JOIN permission 
		WHERE role.name in ('Data Manager', 'Data Importer', 'Data Owner/Supplier') AND permission.short_name in ('DATA_IMPORT')
);

INSERT into role_permission (role_id, permission_id) ( 
  SELECT role.role_id, permission.permission_id FROM role CROSS JOIN permission 
		WHERE role.name in ('Output Checker', 'Data Preparation') AND permission.short_name in ('DATA_AUDIT')
);

INSERT into role_permission (role_id, permission_id) ( 
  SELECT role.role_id, permission.permission_id FROM role CROSS JOIN permission 
		WHERE role.name in ('Access Control Manager', 'Data Director', 'Auditor') AND permission.short_name
		in (
			'VIEW_USERS',
			'EDIT_USERS',
			'ADD_USERS',
			'VIEW_ROLES',
			'EDIT_ROLES',
			'ADD_ROLES',
			'DELETE_ROLES',
			'VIEW_PERMISSIONS',
			'EDIT_PERMISSIONS',
			'ADD_PERMISSIONS',
			'DELETE_PERMISSIONS',
			'VIEW_JOURNEYS',
			'EDIT_JOURNEYS',
			'ADD_JOURNEYS',
			'DELETE_JOURNEYS',
			'DATA_IMPORT',
			'DATA_AUDIT'
		)
);

INSERT INTO user (firstname, lastname, email, username, password, status, role_id)
VALUES 	('Jon', 'Smith', 'j.smith@test.com', 'test_acm', 'test', 'active', (SELECT role.role_id FROM role WHERE role.name = 'Access Control Manager'));

INSERT INTO supplier (name, description)
VALUES ('HMRC', 'HMRC');

INSERT INTO journey (name, description, supplier_id)
VALUES ('VAT', 'VAT File Journey', (SELECT supplier.supplier_id FROM supplier WHERE supplier.name = 'HMRC')),
('FT VAT', 'FT VAT File Journey', (SELECT supplier.supplier_id FROM supplier WHERE supplier.name = 'HMRC'));

INSERT INTO journey_version (journey_id, version_number, validator, extensions, protocol)
VALUES ((SELECT journey.journey_id FROM journey WHERE journey.name = 'VAT'), 1, 'vat_*', 'csv,txt', 'default'),
	((SELECT journey.journey_id FROM journey WHERE journey.name = 'FT VAT'), 1, 'ft_vat_*', 'zip,rar', 'default');

INSERT INTO journey_version_role (journey_version_id, role_id) (
	SELECT journey_version.journey_version_id, role.role_id FROM role CROSS JOIN journey_version
	WHERE journey_version.validator in ('vat_*', 'ft_vat_*') AND role.name
	in ('Access Control Manager', 'Data Director', 'Auditor')
);


INSERT INTO journey_step (name, description, short_name)
VALUES ('Upload to Server', 'Upload the file to the server', 'UPLOAD_TO_SERVER'),
('Upload to Move It', 'Upload the file to the move it server', 'UPLOAD_TO_MOVEIT'),
('Upload to Sandbox VM', 'Upload the file to the Sandbox VM', 'UPLOAD_TO_SANDBOX'),
('Antivirus Check', 'Perform the Antivirus check on the uploaded file', 'ANTIVIRUS_CHECK'),
('Filename Validation', 'Validates the file name', 'FILENAME_VALIDATION'),
('Filesize Validation', 'Validates the file size', 'FILESIZE_VALIDATION'),
('Header Validation', 'Validates the first record line', 'HEADER_VALIDATION'),
('Footer Validation', 'Validates the last record line', 'FOOTER_VALIDATION'),
('File data Validation', 'Validates the rest of the data of the file ', 'FILEDATA_VALIDATION'),
('Record Type Validation', 'Perform the File Level check on the uploaded file', 'RCD_TYPE_VALIDATION');


INSERT INTO journey_version_step (journey_version_id, journey_step_id) (
	SELECT journey_version.journey_version_id, journey_step.journey_step_id FROM journey_version CROSS JOIN journey_step
	WHERE journey_version.validator in ('vat_*', 'ft_vat_*')
);

INSERT INTO schedule (date, journey_version_id)
VALUES ('2017-01-01', (SELECT journey_version.journey_version_id from journey_version WHERE journey_version.validator = 'vat_*' ));
