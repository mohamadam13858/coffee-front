import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'کافه کروسان',
        short_name: 'کروسان',
        description: 'منوی دیجیتال کافه – سفارش آنلاین قهوه و نوشیدنی ',
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