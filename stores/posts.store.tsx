import { create } from "zustand";

interface PostsState {
  postId: any;
  actions: {
    setPostId: any;
  };
}

export const usePostsStore = create<PostsState>()((set, get) => ({
  postId: undefined,

  actions: {
    setPostId: () => set(() => ({ postId: undefined })),
  },
}));
