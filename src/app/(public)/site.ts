// Dynamic site configuration loaded from database
// Fallback values are used if DB fetch fails

let cachedSiteInfo: any = null;
let fetchPromise: Promise<any> | null = null;

async function fetchSiteInfo() {
  if (cachedSiteInfo) return cachedSiteInfo;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch("/api/system-info")
    .then(res => res.json())
    .then(data => {
      cachedSiteInfo = data;
      return data;
    })
    .catch(() => {
      // Return fallback values on error
      return {
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
      };
    })
    .finally(() => {
      fetchPromise = null;
    });

  return fetchPromise;
}

export async function getSiteInfo() {
  return await fetchSiteInfo();
}

// Synchronous fallback for initial render (will be updated after fetch)
export const SITE = {
  name: "V-Technologies",
  shortName: "V-Tech",
  tagline: "Repair & Service Experts",
  phone: "+91 91791 05875",
  phoneHref: "tel:+919179105875",
  whatsapp: "https://wa.me/919179105875",
  email: "vtech.jbp@gmail.com",
  address: "F4 Hotel Plaza (Madhushala), Besides Jayanti Complex, Marhatal, Jabalpur, MP 482002",
};

export const WHATSAPP_LINK = (text: string, phone?: string) => {
  const whatsappPhone = phone || SITE.whatsapp.replace("https://wa.me/", "").replace(/\D/g, "");
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
};
