
BEGIN;

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

COMMIT;