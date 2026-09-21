import post_1 from '../img/post_img.jpg'

export type Post = {
  id: number
  imageUrl: string
  isNew: boolean
  tags: string[]
  title: string
  description: string
  date: string
  commentCount: number
}

export const posts: Post[] = [
  {
    id: 1,
    imageUrl: post_1,
    isNew: true,
    tags: ['Google', 'Trend', 'Yeni'],
    title: "Loudest à la Madison #1 (L'integral)",
    description:
      'Ergonomiye ve sizi çalıştığınız yerde bulmaya odaklanıyoruz. Sadece bir tuş vuruşu kadar yakın.',
    date: '22 Nisan 2021',
    commentCount: 10,
  },
  {
    id: 2,
    imageUrl: post_1,
    isNew: true,
    tags: ['Google', 'Trend', 'Yeni'],
    title: "Loudest à la Madison #2 (L'integral)",
    description:
      'Ergonomiye ve sizi çalıştığınız yerde bulmaya odaklanıyoruz. Sadece bir tuş vuruşu kadar yakın.',
    date: '22 Nisan 2021',
    commentCount: 10,
  },
  {
    id: 3,
    imageUrl: post_1,
    isNew: true,
    tags: ['Google', 'Trend', 'Yeni'],
    title: "Loudest à la Madison #3 (L'integral)",
    description:
      'Ergonomiye ve sizi çalıştığınız yerde bulmaya odaklanıyoruz. Sadece bir tuş vuruşu kadar yakın.',
    date: '22 Nisan 2021',
    commentCount: 10,
  },
]
