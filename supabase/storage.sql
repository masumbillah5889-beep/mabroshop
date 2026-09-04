-- Mabro Shop — image upload storage
-- Run this once in the Supabase SQL editor, after schema.sql. Sets up a
-- public bucket for product/category photos uploaded from the admin panel.

insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Anyone can view images (needed so product photos load on the public site)
create policy "Public can view images"
on storage.objects for select
using (bucket_id = 'images');

-- Only signed-in admins can upload, replace, or remove images
create policy "Admins can upload images"
on storage.objects for insert
with check (bucket_id = 'images' and auth.role() = 'authenticated');

create policy "Admins can update images"
on storage.objects for update
using (bucket_id = 'images' and auth.role() = 'authenticated');

create policy "Admins can delete images"
on storage.objects for delete
using (bucket_id = 'images' and auth.role() = 'authenticated');
