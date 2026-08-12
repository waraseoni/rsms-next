import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); },
      },
    }
  );

  // Fetch from meta table (meta_field, meta_value pattern)
  const { data: metaRows, error } = await supabase
    .from("system_info")
    .select("meta_field, meta_value");

  if (error) {
    console.error("System info fetch error:", error);
  }

  if (error || !metaRows || metaRows.length === 0) {
    // Fallback to default values if DB fails
    console.log("Using fallback values for system_info");
    return NextResponse.json({
      shop_name: "V-Technologies",
      short_name: "V-Tech",
      tagline: "Repair & Service Experts",
      phone: "+91 91791 05875",
      whatsapp: "+91 91791 05875",
      email: "vtech.jbp@gmail.com",
      address: "F4 Hotel Plaza (Madhushala), Besides Jayanti Complex, Marhatal, Jabalpur, MP 482002",
      website_url: null,
      gst_number: null,
      established_year: 2007,
      business_hours: "Mon-Sat: 10 AM - 8 PM",
    });
  }

  // Convert meta_field/meta_value to object
  const metaMap: Record<string, string> = {};
  metaRows.forEach(row => {
    metaMap[row.meta_field] = row.meta_value;
  });

  // Map meta fields to our expected format
  const bizHours = `${metaMap.biz_days || "Mon-Sat"} · ${metaMap.biz_open || "10:00"} - ${metaMap.biz_close || "20:00"}`;

  return NextResponse.json({
    shop_name: metaMap.name || "V-Technologies",
    short_name: metaMap.short_name || "V-Tech",
    tagline: "Repair & Service Experts",
    phone: metaMap.contact ? `+91 ${metaMap.contact}` : "+91 91791 05875",
    whatsapp: metaMap.contact ? `+91 ${metaMap.contact}` : "+91 91791 05875",
    email: metaMap.email || "vtech.jbp@gmail.com",
    address: metaMap.address || "F4 Hotel Plaza (Madhushala), Besides Jayanti Complex, Marhatal, Jabalpur, MP 482002",
    website_url: null,
    gst_number: metaMap.gst_no || metaMap.gstin || null,
    established_year: 2007,
    business_hours: bizHours,
  });
}
