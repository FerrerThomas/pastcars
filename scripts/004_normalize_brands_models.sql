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

-- Enable RLS for new tables
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Allow public read models" ON public.models FOR SELECT USING (true);

-- Allow admin full access (using anon key for now as per project setup)
CREATE POLICY "Allow public all brands" ON public.brands FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all models" ON public.models FOR ALL USING (true) WITH CHECK (true);


-- ------------------------------------------------------------
-- MIGRATION LOGIC (Populate from existing vehicles)
-- ------------------------------------------------------------

-- Populate Brands
INSERT INTO public.brands (name, slug)
SELECT DISTINCT brand, LOWER(REPLACE(brand, ' ', '-'))
FROM public.vehicles
WHERE brand IS NOT NULL
ON CONFLICT (name) DO NOTHING;

-- Populate Models
INSERT INTO public.models (name, brand_id)
SELECT DISTINCT v.model, b.id
FROM public.vehicles v
JOIN public.brands b ON v.brand = b.name
WHERE v.model IS NOT NULL
ON CONFLICT (name, brand_id) DO NOTHING;


-- ------------------------------------------------------------
-- UPDATE VEHICLES TABLE
-- ------------------------------------------------------------

-- Add new FK columns
ALTER TABLE public.vehicles ADD COLUMN IF NOT EXISTS brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL;
ALTER TABLE public.vehicles ADD COLUMN IF NOT EXISTS model_id UUID REFERENCES public.models(id) ON DELETE SET NULL;

-- Populate new columns based on existing text
UPDATE public.vehicles v
SET 
    brand_id = b.id,
    model_id = m.id
FROM public.brands b
LEFT JOIN public.models m ON m.name = v.model AND m.brand_id = b.id
WHERE v.brand = b.name;

-- Note: We are NOT dropping the old 'brand' and 'model' columns yet to prevent breaking the app immediately.
-- The app should be updated to use brand_id and model_id, or we can add a generated column or view.
-- For now we keep them but they might get out of sync if we don't update the code.
