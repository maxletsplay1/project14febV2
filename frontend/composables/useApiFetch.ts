export const useApiFetch = async <T>(url: string, options: any = {}) => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiUrl;

    const fetchOptions = {
        method: 'GET',
        ...options,
    };

    const { data, error, status } = await useFetch<T>(`${apiUrl}${url}`, fetchOptions);

    return { data, error, status };
};
