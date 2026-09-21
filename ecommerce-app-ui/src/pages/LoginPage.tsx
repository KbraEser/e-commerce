import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import FormField from '../components/auth/FormField'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'
import { loginUser } from '../store/thunks/authThunks'
import { toast } from 'react-toastify'
import { setAuthToken } from '../service/axios'
import { saveToken } from '../service/tokenStorage'

type LoginFormValues = {
  email: string
  password: string
  rememberMe: boolean
}

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: string } | null)?.from ?? '/'


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({defaultValues:{rememberMe:false}})

  const onSubmit = async (data: LoginFormValues) => {
    const result = await dispatch(loginUser({ email: data.email, password: data.password }))
    if (loginUser.fulfilled.match(result)) {
      setAuthToken(result.payload.token)
      saveToken(result.payload.token, data.rememberMe)
      navigate(from, { replace: true })
    } else {
      toast.error(result.payload ?? 'Giriş başarısız oldu.')
    }
  }

  return (
    <AuthLayout
      variant="login"
      title="Giriş yap"
      subtitle="Hesabınıza erişmek için bilgilerinizi girin."
      footerText="Hesabınız yok mu?"
      footerLinkText="Hemen oluşturun"
      footerLinkTo="/signup"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <FormField
          label="E-posta Adresi"
          type="email"
          placeholder="siz@ornek.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'E-posta zorunludur.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Lütfen geçerli bir e-posta adresi girin.',
            },
          })}
        />

        <div>
          <FormField
            label="Şifre"
            type="password"
            placeholder="Şifrenizi girin"
            error={errors.password?.message}
            {...register('password', {
              required: 'Şifre zorunludur.',
            })}
          />
          <div className="mt-2 text-right">
            <Link
              to="#"
              className="text-xs font-bold text-secondary transition-colors hover:text-[#1a85c2]"
            >
              Şifrenizi mi unuttunuz?
            </Link>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-light">
  <input type="checkbox" {...register('rememberMe')} />
  Beni hatırla
</label>

        <button
          type="submit"
          className="mt-1 w-full rounded-lg bg-secondary px-6 py-4 text-sm font-bold text-white shadow-[0_4px_14px_rgba(35,166,240,0.35)] transition-all hover:bg-[#1a85c2] hover:shadow-[0_6px_20px_rgba(35,166,240,0.4)] active:scale-[0.98] cursor-pointer"
        >
          Giriş
        </button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
