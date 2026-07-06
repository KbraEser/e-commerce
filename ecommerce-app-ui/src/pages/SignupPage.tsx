import { useForm } from 'react-hook-form'
import { Store } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout'
import FormField from '../components/auth/FormField'
import SelectField from '../components/auth/SelectField'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import { fetchRoles } from '../store/thunks/clientThunks'
import { useEffect } from 'react'


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

  const roles = useSelector((state: RootState) => state.client.roles)

  useEffect(()=>{
    dispatch(fetchRoles())
  },[dispatch])
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      role_id: 3,
      storeName: '',
      storePhone: '',
      storeTaxNo: '',
      storeBankAccount: '',
    },
  })

  const selectedRoleId = watch('role_id')
  const isStoreRole = selectedRoleId === 2

  const onSubmit = () => {}

  return (
    <AuthLayout
      variant="signup"
      title="Create an account"
      subtitle="Fill in your details below to get started."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex min-w-0 flex-col gap-4" noValidate>
        <FormField
          label="Full Name"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register('name', {
            required: 'Name is required.',
            minLength: { value: 3, message: 'Name must be at least 3 characters.' },
          })}
        />

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

        <FormField
          label="Password"
          type="password"
          placeholder="Create a strong password"
          hint="Min. 8 characters with uppercase, lowercase, number & special char."
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required.',
            pattern: {
              value: PASSWORD_REGEX,
              message:
                'Password must be 8+ chars with uppercase, lowercase, number and special character.',
            },
          })}
        />

        <FormField
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password.',
            validate: (value, formValues) =>
              value === formValues.password || 'Passwords do not match.',
          })}
        />

        <SelectField
          label="Account Type"
          options={roles.map((role) => ({ value: role.id, label: role.name }))}
          error={errors.role_id?.message}
          {...register('role_id', {
            required: 'Please select an account type.',
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
                <p className="text-sm font-bold text-primary">Store Details</p>
                <p className="text-xs font-medium text-gray-light">
                  Required for store accounts
                </p>
              </div>
            </div>

            <FormField
              label="Store Name"
              placeholder="Your store name"
              error={errors.storeName?.message}
              {...register('storeName', {
                validate: (value) =>
                  !isStoreRole ||
                  value.trim().length >= 3 ||
                  'Store name must be at least 3 characters.',
              })}
            />

            <FormField
              label="Store Phone"
              placeholder="+905321234567"
              error={errors.storePhone?.message}
              {...register('storePhone', {
                validate: (value) =>
                  !isStoreRole ||
                  TURKEY_PHONE_REGEX.test(value.replace(/\s/g, '')) ||
                  'Please enter a valid Turkish phone number.',
              })}
            />

            <FormField
              label="Tax ID"
              placeholder="T1234V567890"
              hint="Format: TXXXXVXXXXXX"
              error={errors.storeTaxNo?.message}
              {...register('storeTaxNo', {
                validate: (value) =>
                  !isStoreRole ||
                  TAX_NO_REGEX.test(value) ||
                  'Tax ID must match the pattern TXXXXVXXXXXX.',
              })}
            />

            <FormField
              label="Bank Account (IBAN)"
              placeholder="TR330006100519786457841326"
              error={errors.storeBankAccount?.message}
              {...register('storeBankAccount', {
                validate: (value) =>
                  !isStoreRole ||
                  IBAN_REGEX.test(value.replace(/\s/g, '')) ||
                  'Please enter a valid Turkish IBAN.',
              })}
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-1 w-full rounded-lg bg-secondary px-6 py-4 text-sm font-bold text-white shadow-[0_4px_14px_rgba(35,166,240,0.35)] transition-all hover:bg-[#1a85c2] hover:shadow-[0_6px_20px_rgba(35,166,240,0.4)] active:scale-[0.98]"
        >
          Create Account
        </button>
      </form>
    </AuthLayout>
  )
}

export default SignupPage
