import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import Link from 'next/link'

const logos = [
    {
        src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nvidia.svg',
        alt: 'Nvidia',
        height: 'h-5',
    },
    {
        src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg',
        alt: 'GitHub',
        height: 'h-5',
    },
    {
        src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tailwindcss.svg',
        alt: 'Tailwind CSS',
        height: 'h-4',
    },
    {
        src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nike.svg',
        alt: 'Nike',
        height: 'h-5',
    },
    {
        src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/stripe.svg',
        alt: 'Stripe',
        height: 'h-5',
    },
    {
        src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/laravel.svg',
        alt: 'Laravel',
        height: 'h-4',
    },
    {
        src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apple.svg',
        alt: 'Apple',
        height: 'h-5',
    },
    {
        src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg',
        alt: 'OpenAI',
        height: 'h-5',
    },
]

export default function LogoCloud() {
    return (
        <section className="bg-background overflow-hidden py-16">
            <div className="mx-auto max-w-5xl px-6">
                {/* Centered heading block */}
                <div className="mb-10 text-center">
                    <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest mb-3">
                        Trusted by the best
                    </p>
                    <h2 className="text-foreground text-2xl font-semibold tracking-tight">
                        You&apos;re in good company
                    </h2>
                    <p className="text-muted-foreground mt-3 text-sm max-w-sm mx-auto">
                        Thousands of teams use our platform to discover, shop, and manage products they love.
                    </p>
                </div>

                {/* Infinite marquee */}
                <div className="relative">
                    <InfiniteSlider speed={40} speedOnHover={20} gap={80}>
                        {logos.map((logo) => (
                            <div key={logo.alt} className="flex items-center justify-center px-4">
                                <img
                                    src={logo.src}
                                    alt={`${logo.alt} Logo`}
                                    className={`${logo.height} w-auto dark:invert opacity-60 hover:opacity-100 transition-opacity duration-300`}
                                />
                            </div>
                        ))}
                    </InfiniteSlider>

                    {/* Fade masks */}
                    <ProgressiveBlur
                        className="pointer-events-none absolute left-0 top-0 h-full w-24"
                        direction="left"
                        blurIntensity={1}
                    />
                    <ProgressiveBlur
                        className="pointer-events-none absolute right-0 top-0 h-full w-24"
                        direction="right"
                        blurIntensity={1}
                    />
                    <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r" />
                    <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l" />
                </div>

                {/* CTA */}
                <div className="mt-10 text-center">
                    <Link
                        href="/shop"
                        className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors duration-200">
                        See customer stories →
                    </Link>
                </div>
            </div>
        </section>
    )
}

