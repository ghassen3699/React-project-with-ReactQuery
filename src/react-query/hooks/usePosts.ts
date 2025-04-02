import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const usePosts = (userID: number | undefined) => {
    const fetchPosts = () => {
        return axios
            .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    userId: userID
                }
            })
            .then(res => res.data)
    }

    return useQuery<Post[], Error>({
        queryKey: ['users', userID, 'posts'],
        queryFn: fetchPosts
    })
};

export default usePosts;