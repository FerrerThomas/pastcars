-- -----------------------------------------------------------------------------
-- RESET & SEED SCRIPT
-- WARNING: This will DELETE ALL existing vehicles.
-- -----------------------------------------------------------------------------

-- 1. CLEANUP & SCHEMA UPDATE
TRUNCATE TABLE public.vehicle_images CASCADE;
TRUNCATE TABLE public.vehicles CASCADE;

-- Create brands table
CREATE TABLE IF NOT EXISTS public.brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create models table
CREATE TABLE IF NOT EXISTS public.models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  brand_id UUID NOT NULL REFERENCES public.brands(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(name, brand_id)
);

-- Enable RLS
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

-- Policies (Public Read, Admin Write)
CREATE POLICY "Allow public read brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Allow public read models" ON public.models FOR SELECT USING (true);
-- Using 'true' for write policies to allow running this script easily via API if needed, 
-- but primarily for admin usage. In production, restrict to admin role.
CREATE POLICY "Allow public all brands" ON public.brands FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all models" ON public.models FOR ALL USING (true) WITH CHECK (true);

-- Update vehicles table columns
-- We drop old columns since we are starting from scratch
ALTER TABLE public.vehicles DROP COLUMN IF EXISTS brand;
ALTER TABLE public.vehicles DROP COLUMN IF EXISTS model;
ALTER TABLE public.vehicles ADD COLUMN brand_id UUID NOT NULL REFERENCES public.brands(id);
ALTER TABLE public.vehicles ADD COLUMN model_id UUID NOT NULL REFERENCES public.models(id);


-- -----------------------------------------------------------------------------
-- 2. SEED DATA
-- -----------------------------------------------------------------------------

DO $$
DECLARE
  v_brand_id UUID;
BEGIN
  -- TOYOTA
  INSERT INTO public.brands (name, slug) VALUES ('Toyota', 'toyota') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'Corolla'), (v_brand_id, 'Hilux'), (v_brand_id, 'Etios'), (v_brand_id, 'Yaris'), (v_brand_id, 'Corolla Cross'), (v_brand_id, 'SW4'), (v_brand_id, 'RAV4'), (v_brand_id, 'Camry'), (v_brand_id, 'Land Cruiser');

  -- VOLKSWAGEN
  INSERT INTO public.brands (name, slug) VALUES ('Volkswagen', 'volkswagen') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'Gol Trend'), (v_brand_id, 'Amarok'), (v_brand_id, 'Vento'), (v_brand_id, 'Polo'), (v_brand_id, 'Virtus'), (v_brand_id, 'T-Cross'), (v_brand_id, 'Nivus'), (v_brand_id, 'Taos'), (v_brand_id, 'Tiguan'), (v_brand_id, 'Saveiro');

  -- FORD
  INSERT INTO public.brands (name, slug) VALUES ('Ford', 'ford') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'Ranger'), (v_brand_id, 'Focus'), (v_brand_id, 'Fiesta'), (v_brand_id, 'EcoSport'), (v_brand_id, 'Ka'), (v_brand_id, 'Territory'), (v_brand_id, 'Bronco'), (v_brand_id, 'Maverick'), (v_brand_id, 'Mustang'), (v_brand_id, 'F-150');

  -- BMW
  INSERT INTO public.brands (name, slug) VALUES ('BMW', 'bmw') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'Serie 1'), (v_brand_id, 'Serie 2'), (v_brand_id, 'Serie 3'), (v_brand_id, 'Serie 4'), (v_brand_id, 'Serie 5'), (v_brand_id, 'X1'), (v_brand_id, 'X3'), (v_brand_id, 'X5'), (v_brand_id, 'X6'), (v_brand_id, 'M3'), (v_brand_id, 'M4');

  -- MERCEDES-BENZ
  INSERT INTO public.brands (name, slug) VALUES ('Mercedes-Benz', 'mercedes-benz') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'Clase A'), (v_brand_id, 'Clase C'), (v_brand_id, 'Clase E'), (v_brand_id, 'GLA'), (v_brand_id, 'GLC'), (v_brand_id, 'GLE'), (v_brand_id, 'Sprinter');

  -- PEUGEOT
  INSERT INTO public.brands (name, slug) VALUES ('Peugeot', 'peugeot') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, '208'), (v_brand_id, '308'), (v_brand_id, '408'), (v_brand_id, '2008'), (v_brand_id, '3008'), (v_brand_id, '5008'), (v_brand_id, 'Partner');

  -- RENAULT
  INSERT INTO public.brands (name, slug) VALUES ('Renault', 'renault') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'Sandero'), (v_brand_id, 'Stepway'), (v_brand_id, 'Logan'), (v_brand_id, 'Kangoo'), (v_brand_id, 'Duster'), (v_brand_id, 'Kwid'), (v_brand_id, 'Oroch'), (v_brand_id, 'Alaskan'), (v_brand_id, 'Koleos');

  -- CHEVROLET
  INSERT INTO public.brands (name, slug) VALUES ('Chevrolet', 'chevrolet') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'Onix'), (v_brand_id, 'Cruze'), (v_brand_id, 'Tracker'), (v_brand_id, 'S10'), (v_brand_id, 'Equinox'), (v_brand_id, 'Trailblazer'), (v_brand_id, 'Camaro');

  -- FIAT
  INSERT INTO public.brands (name, slug) VALUES ('Fiat', 'fiat') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'Cronos'), (v_brand_id, 'Argo'), (v_brand_id, 'Mobi'), (v_brand_id, 'Toro'), (v_brand_id, 'Pulse'), (v_brand_id, 'Fiorino'), (v_brand_id, 'Ducato'), (v_brand_id, 'Strada');

  -- JEEP
  INSERT INTO public.brands (name, slug) VALUES ('Jeep', 'jeep') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'Renegade'), (v_brand_id, 'Compass'), (v_brand_id, 'Wrangler'), (v_brand_id, 'Gladiator'), (v_brand_id, 'Grand Cherokee');

  -- AUDI
  INSERT INTO public.brands (name, slug) VALUES ('Audi', 'audi') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'A1'), (v_brand_id, 'A3'), (v_brand_id, 'A4'), (v_brand_id, 'A5'), (v_brand_id, 'Q3'), (v_brand_id, 'Q5'), (v_brand_id, 'Q7');

  -- HONDA
  INSERT INTO public.brands (name, slug) VALUES ('Honda', 'honda') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'Civic'), (v_brand_id, 'HR-V'), (v_brand_id, 'CR-V'), (v_brand_id, 'Fit'), (v_brand_id, 'WR-V'), (v_brand_id, 'ZR-V');

  -- NISSAN
  INSERT INTO public.brands (name, slug) VALUES ('Nissan', 'nissan') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'Frontier'), (v_brand_id, 'Kicks'), (v_brand_id, 'Sentra'), (v_brand_id, 'Versa'), (v_brand_id, 'X-Trail');

  -- CITROËN
  INSERT INTO public.brands (name, slug) VALUES ('Citroën', 'citroen') RETURNING id INTO v_brand_id;
  INSERT INTO public.models (brand_id, name) VALUES 
  (v_brand_id, 'C3'), (v_brand_id, 'C4 Cactus'), (v_brand_id, 'C5 Aircross'), (v_brand_id, 'Berlingo');

END $$;
