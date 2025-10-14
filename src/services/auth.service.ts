import {api} from '@/lib/axios'

type LoginPayload = {
  email: string
  password: string
}

type LoginResponse = {
  user: {
    id: string
    name?: string | null
    email: string
  }
  access_token?: string
  refresh_token?: string
  expires_in?: number
}

export const AuthService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>('/auth/login', payload)
    return res.data
  },
  async refresh(refresh_token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({refresh_token})
    });
    return res.json();
  },
}


