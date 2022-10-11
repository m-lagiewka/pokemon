import getApiClient from "./getApiClient";

export const getPokemons = async (
    limit,
    offset
) => {
    const axiosInstance = getApiClient();
    const { data } = await axiosInstance.get("",
        {
            params: {
                limit,
                offset,
            },
        },
    );
    return data;
};
