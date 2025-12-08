-- Enable write access for vehicles table
CREATE POLICY "Allow public insert vehicles" ON public.vehicles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update vehicles" ON public.vehicles FOR UPDATE USING (true);
CREATE POLICY "Allow public delete vehicles" ON public.vehicles FOR DELETE USING (true);

-- Enable write access for vehicle_images table
CREATE POLICY "Allow public insert vehicle_images" ON public.vehicle_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update vehicle_images" ON public.vehicle_images FOR UPDATE USING (true);
CREATE POLICY "Allow public delete vehicle_images" ON public.vehicle_images FOR DELETE USING (true);

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) VALUES ('vehicles', 'vehicles', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies for the 'vehicles' bucket
CREATE POLICY "Allow public select vehicles bucket" ON storage.objects FOR SELECT USING (bucket_id = 'vehicles');
CREATE POLICY "Allow public insert vehicles bucket" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'vehicles');
CREATE POLICY "Allow public update vehicles bucket" ON storage.objects FOR UPDATE USING (bucket_id = 'vehicles');
CREATE POLICY "Allow public delete vehicles bucket" ON storage.objects FOR DELETE USING (bucket_id = 'vehicles');
