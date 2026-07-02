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
    tags: ['Google', 'Trending', 'New'],
    title: "Loudest à la Madison #1 (L'integral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: '22 April 2021',
    commentCount: 10,
  },
  {
    id: 2,
    imageUrl: post_1,
    isNew: true,
    tags: ['Google', 'Trending', 'New'],
    title: "Loudest à la Madison #2 (L'integral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: '22 April 2021',
    commentCount: 10,
  },
  {
    id: 3,
    imageUrl: post_1,
    isNew: true,
    tags: ['Google', 'Trending', 'New'],
    title: "Loudest à la Madison #3 (L'integral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: '22 April 2021',
    commentCount: 10,
  },
]
