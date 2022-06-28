import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory,
    getCategoryById,
} from "../services/categories";
import { getAllProducts, getProductById, deleteProductById, createProduct, updateProduct } from "../services/products";
import { getAllUsers, getUserById, deleteUserById, updateUser, createUser } from "../services/users";

const defaultOptions = {
    staleTime: Infinity,
    cacheTime: Infinity,
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
};

/* Products */

export function useProducts(options = {}) {
    return useQuery(["products"], getAllProducts, { ...defaultOptions, ...options });
}

export function useProduct(productId, options = {}) {
    return useQuery(["product", productId], () => getProductById(productId), { ...defaultOptions, ...options });
}

export function useProductMutation() {
    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries(["products"]);
    };

    const { mutate: deleteById } = useMutation((productId) => deleteProductById(productId), { onSuccess });
    const { mutate: create } = useMutation(({ data }) => createProduct(data), { onSuccess });
    const { mutate: update } = useMutation(({ id, data }) => updateProduct(id, data), { onSuccess });

    return { deleteById, create, update };
}

/* Categories */

export function useCategories(options = {}) {
    return useQuery(["categories"], getAllCategories, { ...defaultOptions, ...options });
}

export function useCategory(categoryId, options = {}) {
    return useQuery(["category", categoryId], () => getCategoryById(categoryId), { ...defaultOptions, ...options });
}

export function useCategoryMutation() {
    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries(["categories"]);
    };

    const { mutate: deleteById } = useMutation((categoryId) => deleteCategory(categoryId), { onSuccess });
    const { mutate: create } = useMutation(({ data }) => createCategory(data), { onSuccess });
    const { mutate: update } = useMutation(({ id, data }) => updateCategory(id, data), { onSuccess });

    return { deleteById, create, update };
}

/* Users */

export function useUsers(options = {}) {
    return useQuery(["users"], getAllUsers, { ...defaultOptions, ...options });
}

export function useUser(userId, options = {}) {
    return useQuery(["user", userId], () => getUserById(userId), { ...defaultOptions, ...options });
}

export function useUserMutation() {
    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries(["users"]);
    };

    const { mutate: deleteById } = useMutation((userId) => deleteUserById(userId), { onSuccess });
    const { mutate: create } = useMutation(({ data }) => createUser(data), { onSuccess });
    const { mutate: update } = useMutation(({ id, data }) => updateUser(id, data), { onSuccess });

    return { deleteById, create, update };
}
