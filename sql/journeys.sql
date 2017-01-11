
BEGIN;

INSERT INTO public.journey (name, description)
VALUES ('VAT', 'VAT File Journey');

INSERT INTO public.journey_step (journey_id, name, description, short_name)
VALUES (1, 'Upload to Server', 'Upload the file to the server', 'UPLOAD_TO_SERVER'),
(1, 'Upload to Move It', 'Upload the file to the move it server', 'UPLOAD_TO_MOVEIT'),
(1, 'Upload to Sandbox VM', 'Upload the file to the Sandbox VM', 'UPLOAD_TO_SANDBOX'),
(1, 'Antivirus Check', 'Perform the Antivirus check on the uploaded file', 'ANTIVIRUS_CHECK'),
(1, 'File Level Check', 'Perform the File Level check on the uploaded file', 'FILE_LEVEL_CHECK');

COMMIT;