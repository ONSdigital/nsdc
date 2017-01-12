
BEGIN;

INSERT INTO public.role (name, description)
VALUES 	('Data Director', 'Role with overall corporate responsibility across the data holding. Senior political figure to provide assurance and ultimately resolve any/all reputational issues. Unlikely to have permissions to the data'),
	('Data Owner/Supplier', 'Supplier and owner of the data. Both external and internal sources'),
	('Data Manager', 'Manager responsible for receiving the data from the Data Owner/Supplier. Responsible for ensuring that the ‘correct/relevant’ data journey is applied. Does not carry out the steps involved, but is the manager overseeing. Covers Data lifecycle management.'),
	('Data User', 'Very general and high level view of anyone or anything that may want to access/have permissions to access data'),
	('Auditor', 'Audits the data/usage and roles.'),
	('Output Checker', 'Responsible for checking all outputs. Makes a decision from results if can be made ‘public’, either for general use or as an output.'),
	('Data Preparation', 'Responsible for Cleaning/Standardising/Applying basic business rules'),
	('Data Importer', 'Imports the data into reception area. Checks/assesses for Malware.'),
	('Access Control Manager', 'Agrees and sets role/data and functionality permissions. Responsible for governance process. Works in agreement with Data Manager and Risk Profile Manager to ensure access to data is approved correctly.');

INSERT INTO public.permission (name, description, short_name)
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
	
INSERT into public.role_permission (role_id, permission_id) ( 
  SELECT role.role_id, permission.permission_id FROM role CROSS JOIN permission 
    WHERE role.name = 'Data User' AND permission.short_name in ('VIEW_USERS', 'VIEW_ROLES')
);

INSERT into public.role_permission (role_id, permission_id) ( 
  SELECT role.role_id, permission.permission_id FROM role CROSS JOIN permission 
		WHERE role.name in ('Data Manager', 'Data Importer', 'Data Owner/Supplier') AND permission.short_name in ('DATA_IMPORT')
);

INSERT into public.role_permission (role_id, permission_id) ( 
  SELECT role.role_id, permission.permission_id FROM role CROSS JOIN permission 
		WHERE role.name in ('Output Checker', 'Data Preparation') AND permission.short_name in ('DATA_AUDIT')
);

INSERT into public.role_permission (role_id, permission_id) ( 
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

INSERT INTO public.user (firstname, lastname, email, username, password, status, role_id)
VALUES 	('Test', 'Test', 'test_dd@test.com', 'test_dd', 'test', 'active', (SELECT role.role_id FROM role WHERE role.name = 'Data Director')),
  ('Test', 'Test', 'test_do@test.com', 'test_do', 'test', 'active', (SELECT role.role_id FROM role WHERE role.name = 'Data Owner/Supplier')),
  ('Test', 'Test', 'test_dm@test.com', 'test_dm', 'test', 'active', (SELECT role.role_id FROM role WHERE role.name = 'Data Manager')),
	('Test', 'Test', 'test_du@test.com', 'test_du', 'test', 'active', (SELECT role.role_id FROM role WHERE role.name = 'Data User')),
	('Test', 'Test', 'test_au@test.com', 'test_au', 'test', 'active', (SELECT role.role_id FROM role WHERE role.name = 'Auditor')),
	('Test', 'Test', 'test_oc@test.com', 'test_oc', 'test', 'active', (SELECT role.role_id FROM role WHERE role.name = 'Output Checker')),
  ('Test', 'Test', 'test_dp@test.com', 'test_dp', 'test', 'active', (SELECT role.role_id FROM role WHERE role.name = 'Data Preparation')),
 	('Test', 'Test', 'test_di@test.com', 'test_di', 'test', 'active', (SELECT role.role_id FROM role WHERE role.name = 'Data Importer')),
	('Test', 'Test', 'test_acm@test.com', 'test_acm', 'test', 'active', (SELECT role.role_id FROM role WHERE role.name = 'Access Control Manager'));

INSERT INTO public.journey (name, description)
VALUES ('VAT', 'VAT File Journey');

INSERT INTO public.journey_step (journey_id, name, description, short_name)
VALUES (1, 'Upload to Server', 'Upload the file to the server', 'UPLOAD_TO_SERVER'),
(1, 'Upload to Move It', 'Upload the file to the move it server', 'UPLOAD_TO_MOVEIT'),
(1, 'Upload to Sandbox VM', 'Upload the file to the Sandbox VM', 'UPLOAD_TO_SANDBOX'),
(1, 'Antivirus Check', 'Perform the Antivirus check on the uploaded file', 'ANTIVIRUS_CHECK'),
(1, 'File Level Check', 'Perform the File Level check on the uploaded file', 'FILE_LEVEL_CHECK');


COMMIT;