import type { MetadataRoute } from 'next'


export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'منو بار گرم',
        short_name: 'بار گرم',
        description: 'منوی دیجیتال کافه – سفارش آنلاین قهوه و نوشیدنی گرم',
        start_url: '/',
        display: 'standalone',        
        background_color: '#111827',     
        theme_color: '#d97706',         
        icons: [
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}