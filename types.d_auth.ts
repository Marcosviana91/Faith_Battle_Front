declare type AuthProps = {
    username: string,
    password: string,
}

declare type TokenAuthProps = {
    access_token: string,
    token_type: string,
    id: number,
    status_code?: number,
    detail?: string,
}

declare type TokenProps = {
    exp: string,
    sub: string,
}
