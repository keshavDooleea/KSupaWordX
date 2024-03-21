CREATE POLICY "Give users access to own folder" ON storage.objects 
AS permissive
FOR ALL 
TO authenticated 
USING (bucket_id = 'snapshots' AND auth.uid()::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'snapshots' AND auth.uid()::text = (storage.foldername(name))[1]);