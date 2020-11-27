interface User{
    name: String | null,
    email: String | null,
    password: String | null,
    docks: Array<Array<Object>> | null
}

export = User;