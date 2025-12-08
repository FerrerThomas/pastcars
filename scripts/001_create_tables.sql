-- Create vehicles table
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  kilometers INTEGER,
  fuel_type VARCHAR(50),
  transmission VARCHAR(50),
  description TEXT,
  is_new BOOLEAN DEFAULT false,
  main_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vehicle_images table for multiple images per vehicle
CREATE TABLE IF NOT EXISTS public.vehicle_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table for contact form
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(50),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for public read access to vehicles
CREATE POLICY "Allow public to read vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Allow public to read vehicle images" ON public.vehicle_images FOR SELECT USING (true);

-- Policies for contact submissions (public can insert)
CREATE POLICY "Allow public to insert contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_vehicles_is_new ON public.vehicles(is_new);
CREATE INDEX idx_vehicles_brand ON public.vehicles(brand);
CREATE INDEX idx_vehicles_price ON public.vehicles(price);
CREATE INDEX idx_vehicle_images_vehicle_id ON public.vehicle_images(vehicle_id);
