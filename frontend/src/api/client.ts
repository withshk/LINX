import type { Folder, Link } from "../Components/types/link";

// 백엔드 공통 응답: 성공 { success, message?, data? } / 실패 { success:false, errorCode, message }
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const isForm = init.body instanceof FormData;
    const res = await fetch(`/api${path}`, {
        ...init,
        credentials: "include", // 세션 쿠키(JSESSIONID)로 로그인 유지
        headers: isForm ? init.headers : { "Content-Type": "application/json", ...init.headers },
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
        if (res.status === 401 && location.pathname !== "/LogIn") location.href = "/LogIn";
        throw new Error(json?.message ?? "나중에 다시 시도해주십시오.");
    }
    return json;
}

const post = <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body instanceof FormData ? body : JSON.stringify(body ?? {}) });
const patch = <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body ?? {}) });

interface ServerLink {
    id: number;
    url: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    folderId: number | null;
    pinned: boolean;
    clickCount: number;
    createdAt: string;
}
// 서버 필드명(name/description/imageUrl) ↔ 화면 필드명(title/memo/img)
const toLink = (l: ServerLink): Link => ({
    id: l.id,
    url: l.url,
    title: l.name,
    memo: l.description,
    img: l.imageUrl,
    folderId: l.folderId,
    pinned: l.pinned,
    clickCount: l.clickCount,
    createdAt: new Date(l.createdAt).getTime(),
});
type LinkInput = Pick<Link, "url" | "title" | "memo" | "folderId">;
const toLinkRequest = (l: LinkInput) => ({ url: l.url, name: l.title, description: l.memo, folderId: l.folderId });

export interface Profile { id: number; email: string; username: string; profileImageUrl: string | null }
export interface ActivitySummary {
    joinedAt: string;
    monthlyAddedLinkCount: number;
    totalLinkCount: number;
    mostClickedLink: { id: number; name: string; url: string; clickCount: number } | null;
}

export const api = {
    // 인증
    sendEmailCode: (email: string) => post("/auth/email/verify-request", { email }),
    confirmEmailCode: (email: string, code: string) => post("/auth/email/verify-confirm", { email, code }),
    signup: (body: { email: string; username: string; password: string; passwordConfirm: string }) =>
        post("/auth/signup", body),
    login: (email: string, password: string) => post("/auth/login", { email, password, rememberMe: false }),
    logout: () => post("/auth/logout"),

    // 유저
    getProfile: () => request<{ data: { user: Profile } }>("/user/profile").then((r) => r.data.user),
    getActivitySummary: () => request<{ data: ActivitySummary }>("/user/activity/summary").then((r) => r.data),

    // 폴더
    getFolders: () => request<Folder[]>("/folders"),
    createFolder: (name: string) => post<{ data: Folder }>("/folders", { name }).then((r) => r.data),
    renameFolder: (id: number, name: string) => patch(`/folders/${id}`, { name }),
    deleteFolder: (id: number) => request(`/folders/${id}`, { method: "DELETE" }),

    // 링크
    getLinks: () => request<{ data: { links: ServerLink[] } }>("/links").then((r) => r.data.links.map(toLink)),
    createLink: (l: LinkInput) => post<{ data: ServerLink }>("/links", toLinkRequest(l)).then((r) => toLink(r.data)),
    updateLink: (id: number, l: LinkInput) =>
        patch<{ data: ServerLink }>(`/links/${id}`, toLinkRequest(l)).then((r) => toLink(r.data)),
    deleteLink: (id: number) => request(`/links/${id}`, { method: "DELETE" }),
    togglePin: (id: number) => patch<ServerLink>(`/links/${id}/pin`).then(toLink),
    clickLink: (id: number) => patch<ServerLink>(`/links/${id}/click`).then(toLink),
    uploadLinkImage: (id: number, file: File) => {
        const form = new FormData();
        form.append("image", file);
        return post<{ data: { imageUrl: string } }>(`/links/${id}/image`, form).then((r) => r.data.imageUrl);
    },
};
