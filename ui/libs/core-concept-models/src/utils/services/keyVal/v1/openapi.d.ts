export interface paths {
    "/api/keyVal/{namespace}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all key / val pairs in the specified namespace. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The namespace to query. */
                    namespace: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["48cc7303-ec37-49bc-9f7b-e069da5dffcf"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete all keys in the specified namespace. (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The namespace to delete all keys from */
                    namespace: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/keyVal/{namespace}/{key}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the value stored with the specified key in the specified domain. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Namespace the key is relative to. */
                    namespace: string;
                    /** @description The key to query. */
                    key: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": string;
                    };
                };
            };
        };
        put?: never;
        /**
         * Set the value of the specified key in the specified namespace. By default, values are
         *     stored unencrypted. To store data in encrypted format set the encrypt query param
         *     to true. (v1.0)
         */
        post: {
            parameters: {
                query?: {
                    /** @description If true, encrypt value */
                    encrypt?: boolean;
                };
                header?: never;
                path: {
                    /** @description Namespace the key is relative to. */
                    namespace: string;
                    /** @description The key to set. */
                    key: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": string;
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        /** Delete the value associated with the specified key in the specified namespace. (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Namespace the key is relative to */
                    namespace: string;
                    /** @description The key to delete. */
                    key: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        "48cc7303-ec37-49bc-9f7b-e069da5dffcf": string;
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
