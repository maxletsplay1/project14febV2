export const useApiFetch = async <T>(url: string, options: any = {}) => {
    const config = useRuntimeConfig()
    const apiUrl = config.public.apiUrl
    const { data, error, status } = await useFetch<T>(`${apiUrl}${url}`, options)
    return { data, error, status }
}
