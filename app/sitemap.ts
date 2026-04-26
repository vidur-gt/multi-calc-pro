import { MetadataRoute } from 'next'
import { EMI_SEO_DATA, FD_SEO_DATA, SIP_SEO_DATA, TAX_SEO_DATA } from '@/lib/seo-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.s-money.in'
  
  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/emi-calculator', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/sip-calculator', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/fd-calculator', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/income-tax-calculator', priority: 0.9, changeFrequency: 'monthly' as const },
  ]

  const calculatorRoutes = [
    ...EMI_SEO_DATA.map((page) => `/emi-calculator/${page.slug}`),
    ...SIP_SEO_DATA.map((page) => `/sip-calculator/${page.slug}`),
    ...FD_SEO_DATA.map((page) => `/fd-calculator/${page.slug}`),
    ...TAX_SEO_DATA.map((page) => `/income-tax-calculator/${page.slug}`),
  ]

  const today = new Date()

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: today,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...calculatorRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ]
}
