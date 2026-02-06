-- Create enum types for status and vehicle categories
CREATE TYPE public.prospect_status AS ENUM ('nouveau', 'contacte', 'qualifie', 'converti', 'perdu');
CREATE TYPE public.partner_status AS ENUM ('candidature', 'en_verification', 'approuve', 'refuse', 'suspendu');
CREATE TYPE public.quote_status AS ENUM ('brouillon', 'envoye', 'accepte', 'refuse', 'expire');
CREATE TYPE public.vehicle_category AS ENUM ('berline', 'suv', 'minibus', 'prestige');
CREATE TYPE public.legal_status AS ENUM ('sarl', 'sa', 'sas', 'ei', 'other');

-- Table: prospects (demandes de devis clients)
CREATE TABLE public.prospects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  vehicle_needs TEXT,
  message TEXT,
  status prospect_status NOT NULL DEFAULT 'nouveau',
  source TEXT DEFAULT 'site_web',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table: agencies (agences partenaires)
CREATE TABLE public.agencies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  legal_status legal_status NOT NULL,
  registration_number TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  years_in_business TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_role TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  fleet_size TEXT NOT NULL,
  vehicle_types TEXT[] NOT NULL DEFAULT '{}',
  has_drivers TEXT NOT NULL,
  motivation TEXT,
  status partner_status NOT NULL DEFAULT 'candidature',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table: vehicles (catalogue de véhicules)
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  category vehicle_category NOT NULL,
  seats INTEGER NOT NULL DEFAULT 4,
  transmission TEXT NOT NULL DEFAULT 'Automatique',
  fuel_type TEXT NOT NULL DEFAULT 'Essence',
  daily_rate INTEGER NOT NULL,
  image_url TEXT,
  features TEXT[] NOT NULL DEFAULT '{}',
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_available BOOLEAN NOT NULL DEFAULT true,
  agency_id UUID REFERENCES public.agencies(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table: quotes (devis)
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  prospect_id UUID REFERENCES public.prospects(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  duration_days INTEGER NOT NULL,
  with_driver BOOLEAN NOT NULL DEFAULT false,
  daily_rate INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  notes TEXT,
  status quote_status NOT NULL DEFAULT 'brouillon',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prospects (admin only write, public insert for contact form)
CREATE POLICY "Anyone can submit a prospect request"
ON public.prospects FOR INSERT
WITH CHECK (true);

CREATE POLICY "Prospects are viewable by authenticated users"
ON public.prospects FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update prospects"
ON public.prospects FOR UPDATE
TO authenticated
USING (true);

-- RLS Policies for agencies (public insert for candidature, admin read/update)
CREATE POLICY "Anyone can submit an agency candidature"
ON public.agencies FOR INSERT
WITH CHECK (true);

CREATE POLICY "Agencies are viewable by authenticated users"
ON public.agencies FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update agencies"
ON public.agencies FOR UPDATE
TO authenticated
USING (true);

-- RLS Policies for vehicles (public read, admin write)
CREATE POLICY "Vehicles are publicly viewable"
ON public.vehicles FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert vehicles"
ON public.vehicles FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update vehicles"
ON public.vehicles FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete vehicles"
ON public.vehicles FOR DELETE
TO authenticated
USING (true);

-- RLS Policies for quotes (admin only)
CREATE POLICY "Quotes are viewable by authenticated users"
ON public.quotes FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert quotes"
ON public.quotes FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update quotes"
ON public.quotes FOR UPDATE
TO authenticated
USING (true);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_prospects_updated_at
BEFORE UPDATE ON public.prospects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agencies_updated_at
BEFORE UPDATE ON public.agencies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at
BEFORE UPDATE ON public.vehicles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at
BEFORE UPDATE ON public.quotes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate quote reference
CREATE OR REPLACE FUNCTION public.generate_quote_reference()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reference = 'FR-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER generate_quote_ref
BEFORE INSERT ON public.quotes
FOR EACH ROW
WHEN (NEW.reference IS NULL OR NEW.reference = '')
EXECUTE FUNCTION public.generate_quote_reference();