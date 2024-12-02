import { useEffect } from 'react'
import { db } from '@/controllers/client/client'
import useSWR from 'swr'


interface Post {
    id: string;
    content: string;
    user_id: string;
    likes: number;
    created_at: string;
    attachment: string;
  }

const fetcher = async (id: string) => {
  const { data, error } = await db
    .from('posts')
    .select('id, content, user_id, created_at, attachment, likes')
    .eq('user_name', id)
    .order('created_at', { ascending: false })

  if (error) throw error

  
  return data as Post[]
}

export function usePosts(id: string) {
  const { data, error, mutate } = useSWR<Post[]>(`${id}/posts`, () => fetcher(id))

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error
  }
}

