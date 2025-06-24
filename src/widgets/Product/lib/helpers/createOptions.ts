export const createOptions = (data?: { name: string; id: string }[]) =>
    data?.map((item) => ({
        label: item.name,
        value: item.id,
    })) || [];
