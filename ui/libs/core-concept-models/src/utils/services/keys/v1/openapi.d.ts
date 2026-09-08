export interface paths {
    "/api/keys/ssh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of locally configured ssh keys to install into vm's for this install of studio. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
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
                        "application/json": components["schemas"]["f82996ea-ba68-4e4b-bc41-4a52fa03fbbf"];
                    };
                };
            };
        };
        put?: never;
        /** Create a new ssh key to install in a vm when starting using this install of studio. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["a3ef69df-f1d9-497b-9715-bdeb4342a991"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["a3ef69df-f1d9-497b-9715-bdeb4342a991"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/keys/ssh/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Update an existing ssh key from the local install of studio. This can only update user and notes fields. (v1.0) */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The id of the ssh key to update. */
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["a3ef69df-f1d9-497b-9715-bdeb4342a991"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["a3ef69df-f1d9-497b-9715-bdeb4342a991"];
                    };
                };
            };
        };
        post?: never;
        /** Delete an existing ssh key from the local install of studio. (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The id of the ssh key to delete. */
                    id: string;
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
        "f82996ea-ba68-4e4b-bc41-4a52fa03fbbf": components["schemas"]["1b709de2-7cfa-4b48-9464-0d346708210d"][];
        "1b709de2-7cfa-4b48-9464-0d346708210d": {
            note?: string;
            id?: string;
            user?: string;
        };
        "a3ef69df-f1d9-497b-9715-bdeb4342a991": {
            note?: string;
            file?: string;
            id?: string;
            user?: string;
            key?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
