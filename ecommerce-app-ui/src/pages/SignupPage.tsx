import { useForm } from 'react-hook-form'
import { Store } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout'
import FormField from '../components/auth/FormField'
import SelectField from '../components/auth/SelectField'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import { fetchRoles } from '../store/thunks/clientThunks'
import { registerUser } from '../store/thunks/authThunks'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { RegisterRequest } from '../store/types'


type SignupFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  role_id: number
  storeName: string
  storePhone: string
  storeTaxNo: string
  storeBankAccount: string
}

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=[\]\\;/'`~]).{8,}$/
const TURKEY_PHONE_REGEX = /^(\+90|0)?5\d{9}$/
const TAX_NO_REGEX = /^T\d{4}V\d{6}$/
const IBAN_REGEX = /^TR\d{24}$/i

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const roles = useSelector((state: RootState) => state.client.roles)

  useEffect(()=>{
    dispatch(fetchRoles())
  },[dispatch])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    defaultValues: {
      role_id: 0,
      storeName: '',
      storePhone: '',
      storeTaxNo: '',
      storeBankAccount: '',
    },
  })

  const selectedRoleId = watch('role_id')

  useEffect(() => {
    if (selectedRoleId) return
    const customerRole = roles.find((role) => role.code === 'CUSTOMER')
    if (customerRole) {
      setValue('role_id', customerRole.id)
    }
  }, [roles, selectedRoleId, setValue])

  const isStoreRole = useMemo(
    () => roles.find((role) => role.id === selectedRoleId)?.code === 'STORE',
    [roles, selectedRoleId],
  )

  const onSubmit = async (data: SignupFormValues) => {
    const payload: RegisterRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.confirmPassword,
      role_id: data.role_id,
      ...(isStoreRole && {
        storeName: data.storeName,
        storePhone: data.storePhone,
        storeTaxNo: data.storeTaxNo,
        storeBankAccount: data.storeBankAccount,
      }),
    }

    const result = await dispatch(registerUser(payload))
    if (registerUser.fulfilled.match(result)) {
      toast.success(result.payload.message || 'Hesap başarıyla oluşturuldu. Lütfen giriş yapın.')
      navigate('/login')
    } else {
      toast.error(result.payload ?? 'Kayıt başarısız oldu.')
    }
  }

  return (
    <AuthLayout
      variant="signup"
      title="Hesap oluşturun"
      subtitle="Başlamak için aşağıdaki bilgileri doldurun."
      footerText="Zaten bir hesabınız var mı?"
      footerLinkText="Giriş yapın"
      footerLinkTo="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex min-w-0 flex-col gap-4" noValidate>
        <FormField
          label="Ad Soyad"
          placeholder="Ahmet Yılmaz"
          error={errors.name?.message}
          {...register('name', {
            required: 'Ad Soyad zorunludur.',
            minLength: { value: 3, message: 'Ad Soyad en az 3 karakter olmalıdır.' },
          })}
        />

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

        <FormField
          label="Şifre"
          type="password"
          placeholder="Güçlü bir şifre oluşturun"
          hint="En az 8 karakter, büyük/küçük harf, rakam ve özel karakter içermelidir."
          error={errors.password?.message}
          {...register('password', {
            required: 'Şifre zorunludur.',
            pattern: {
              value: PASSWORD_REGEX,
              message:
                'Şifre en az 8 karakter, büyük/küçük harf, rakam ve özel karakter içermelidir.',
            },
          })}
        />

        <FormField
          label="Şifre Tekrar"
          type="password"
          placeholder="Şifrenizi tekrar girin"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Lütfen şifrenizi doğrulayın.',
            validate: (value, formValues) =>
              value === formValues.password || 'Şifreler eşleşmiyor.',
          })}
        />

        <SelectField
          label="Hesap Tipi"
          options={roles
            .filter((role) => role.code !== 'ADMIN')
            .map((role) => ({ value: role.id, label: role.name }))}
          error={errors.role_id?.message}
          {...register('role_id', {
            required: 'Lütfen bir hesap tipi seçin.',
            valueAsNumber: true,
          })}
        />

        {isStoreRole && (
          <div className="flex flex-col gap-4 rounded-lg border border-secondary/20 bg-secondary/5 p-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15">
                <Store className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">Mağaza Bilgileri</p>
                <p className="text-xs font-medium text-gray-light">
                  Mağaza hesapları için zorunludur
                </p>
              </div>
            </div>

            <FormField
              label="Mağaza Adı"
              placeholder="Mağazanızın adı"
              error={errors.storeName?.message}
              {...register('storeName', {
                validate: (value) =>
                  !isStoreRole ||
                  value.trim().length >= 3 ||
                  'Mağaza adı en az 3 karakter olmalıdır.',
              })}
            />

            <FormField
              label="Mağaza Telefonu"
              placeholder="+905321234567"
              error={errors.storePhone?.message}
              {...register('storePhone', {
                validate: (value) =>
                  !isStoreRole ||
                  TURKEY_PHONE_REGEX.test(value.replace(/\s/g, '')) ||
                  'Lütfen geçerli bir Türkiye telefon numarası girin.',
              })}
            />

            <FormField
              label="Vergi Kimlik No"
              placeholder="T1234V567890"
              hint="Format: TXXXXVXXXXXX"
              error={errors.storeTaxNo?.message}
              {...register('storeTaxNo', {
                validate: (value) =>
                  !isStoreRole ||
                  TAX_NO_REGEX.test(value) ||
                  'Vergi kimlik numarası TXXXXVXXXXXX formatına uygun olmalıdır.',
              })}
            />

            <FormField
              label="Banka Hesabı (IBAN)"
              placeholder="TR330006100519786457841326"
              error={errors.storeBankAccount?.message}
              {...register('storeBankAccount', {
                validate: (value) =>
                  !isStoreRole ||
                  IBAN_REGEX.test(value.replace(/\s/g, '')) ||
                  'Lütfen geçerli bir Türkiye IBAN numarası girin.',
              })}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 w-full rounded-lg bg-secondary px-6 py-4 text-sm font-bold text-white shadow-[0_4px_14px_rgba(35,166,240,0.35)] transition-all hover:bg-[#1a85c2] hover:shadow-[0_6px_20px_rgba(35,166,240,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Hesap oluşturuluyor...' : 'Hesap Oluştur'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default SignupPage
