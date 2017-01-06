
BEGIN;

INSERT INTO public.role (name, description)
VALUES 	('Data Director', 'Role with overall corporate responsibility across the data holding. Senior political figure to provide assurance and ultimately resolve any/all reputational issues. Unlikely to have permissions to the data'),
	('Data Owner/Supplier', 'Supplier and owner of the data. Both external and internal sources'),
	('Data Manager', 'Manager responsible for receiving the data from the Data Owner/Supplier. Responsible for ensuring that the ‘correct/relevant’ data journey is applied. Does not carry out the steps involved, but is the manager overseeing. Covers Data lifecycle management.'),
	('Data User', 'Very general and high level view of anyone or anything that may want to access/have permissions to access data'),
	('Auditor', 'Audits the data/usage and roles.'),
	('Output Checker', 'Responsible for checking all outputs. Makes a decision from results if can be made ‘public’, either for general use or as an output.'),
	('Access Control Manager', 'Agrees and sets role/data and functionality permissions. Responsible for governance process. Works in agreement with Data Manager and Risk Profile Manager to ensure access to data is approved correctly.');

INSERT INTO public.permission (name, description, short_name)
VALUES ('View Users', 'The user can view a list of the users', 'VIEW_USERS'),
	('Edit Users', 'The user can edit a user', 'EDIT_USERS'),
	('Add Users', 'The user can add a user', 'ADD_USERS'),
	('Delete Users', 'The user can delete a user', 'DELETE_USERS'),
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

 -- Data director currently can do nothing
	
INSERT into public.role_permission (role_id, permission_id) ( 
  SELECT role.role_id, permission.permission_id FROM role CROSS JOIN permission 
    WHERE role.name = 'Data User' AND permission.short_name in ('VIEW_USERS', 'VIEW_ROLES')
);

INSERT into public.role_permission (role_id, permission_id) ( 
  SELECT role.role_id, permission.permission_id FROM role CROSS JOIN permission 
    WHERE role.name = 'Data Manager' AND permission.short_name in ('DATA_IMPORT')
);

INSERT into public.role_permission (role_id, permission_id) ( 
  SELECT role.role_id, permission.permission_id FROM role CROSS JOIN permission 
    WHERE role.name = 'Output Checker' AND permission.short_name in ('DATA_AUDIT')
);

INSERT into public.role_permission (role_id, permission_id) ( 
  SELECT role.role_id, permission.permission_id FROM role CROSS JOIN permission 
    WHERE role.name = 'Access Control Manager' AND permission.short_name
		in (
			'VIEW_USERS',
			'EDIT_USERS',
			'ADD_USERS',
			'DELETE_USERS',
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

COMMIT;
