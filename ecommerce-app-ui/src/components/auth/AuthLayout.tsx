import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type AuthLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
  footerText: string
  footerLinkText: string
  footerLinkTo: string
  variant?: 'login' | 'signup'
}

const AuthLayout = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
  variant = 'login',
}: AuthLayoutProps) => {
  return (
    <div className="flex h-dvh w-full overflow-hidden font-sans text-primary">
      {/* Left panel — brand */}
      <aside className="relative hidden h-dvh w-[45%] shrink-0 overflow-hidden bg-primary lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(35,166,240,0.15)_0%,transparent_50%,rgba(45,192,113,0.08)_100%)]" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-button/10 blur-3xl" />

        <div className="relative z-10 p-12">
          <Link to="/" className="text-2xl font-bold tracking-wide text-white">
            Bandage
          </Link>
        </div>

        <div className="relative z-10 px-12 pb-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-secondary">
            {variant === 'signup' ? 'Join us' : 'Welcome back'}
          </p>
          <h2 className="mb-6 text-[42px] font-bold leading-[52px] text-white">
            {variant === 'signup'
              ? 'Start your journey with us today.'
              : 'Glad to see you again.'}
          </h2>
          <p className="max-w-sm text-sm font-medium leading-7 text-white/60">
            {variant === 'signup'
              ? 'Create an account to shop, sell, or manage your store — all in one place.'
              : 'Sign in to access your orders, wishlist, and personalized recommendations.'}
          </p>

          <div className="mt-12 flex gap-8">
            <div>
              <p className="text-2xl font-bold text-white">10K+</p>
              <p className="text-xs font-medium text-white/50">Happy customers</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div>
              <p className="text-2xl font-bold text-white">500+</p>
              <p className="text-xs font-medium text-white/50">Products</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div>
              <p className="text-2xl font-bold text-white">4.9</p>
              <p className="text-xs font-medium text-white/50">Rating</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right panel — form */}
      <main className="flex h-dvh min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-text-gray">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-light-open-gray/60 bg-white px-6 md:px-10 lg:border-none lg:bg-transparent">
          <Link to="/" className="text-xl font-bold tracking-wide text-primary lg:hidden">
            Bandage
          </Link>
          <Link
            to="/shop"
            className="ml-auto text-sm font-semibold text-gray-light transition-colors hover:text-secondary"
          >
            Back to shop
          </Link>
        </header>

        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain px-6 py-5 md:px-10 md:py-6">
          <div className="mx-auto box-border w-full max-w-[440px]">
            <div className="mb-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-secondary">
                Account
              </p>
              <h1 className="mb-2 text-[28px] font-bold leading-tight text-primary md:text-[32px]">
                {title}
              </h1>
              <p className="text-sm font-medium leading-6 text-gray-light">{subtitle}</p>
            </div>

            <div className="box-border w-full max-w-full overflow-hidden rounded-xl border border-light-open-gray/80 bg-white p-6 shadow-[0_8px_30px_rgba(37,43,66,0.06)] md:p-7">
              {children}

              <div className="mt-5 border-t border-light-open-gray/60 pt-4 text-center">
                <p className="text-sm font-medium text-gray-light">
                  {footerText}{' '}
                  <Link
                    to={footerLinkTo}
                    className="font-bold text-secondary transition-colors hover:text-[#1a85c2]"
                  >
                    {footerLinkText}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
