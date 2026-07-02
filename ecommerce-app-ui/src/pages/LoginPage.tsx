import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import FormField from '../components/auth/FormField'

type LoginFormValues = {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>()

  const onSubmit = () => {}

  return (
    <AuthLayout
      variant="login"
      title="Sign in"
      subtitle="Enter your credentials to access your account."
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLinkTo="/signup"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <FormField
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address.',
            },
          })}
        />

        <div>
          <FormField
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required.',
            })}
          />
          <div className="mt-2 text-right">
            <Link
              to="#"
              className="text-xs font-bold text-secondary transition-colors hover:text-[#1a85c2]"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="mt-1 w-full rounded-lg bg-secondary px-6 py-4 text-sm font-bold text-white shadow-[0_4px_14px_rgba(35,166,240,0.35)] transition-all hover:bg-[#1a85c2] hover:shadow-[0_6px_20px_rgba(35,166,240,0.4)] active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
