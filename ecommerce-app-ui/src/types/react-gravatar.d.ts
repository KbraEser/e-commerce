declare module 'react-gravatar' {
  import type { ImgHTMLAttributes } from 'react'

  interface GravatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    email: string
    size?: number
    rating?: string
    default?: string
    className?: string
  }

  export default function Gravatar(props: GravatarProps): JSX.Element
}
