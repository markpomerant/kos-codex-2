export interface paths {
    "/api/keysets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all available keysets. (v1.0) */
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
                        "application/json": components["schemas"]["5cb56c4a-3fc3-4596-b78d-a16b38c7b6af"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/keysets/imports": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of imported keysets. (v1.0) */
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
                        "application/json": components["schemas"]["59849635-aba3-4883-968d-762353f7c48b"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/keysets/imports/{*path}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Import the production keySet file. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Path to the keySet file to import. */
                    path: string;
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
                        "application/json": components["schemas"]["d1cac24e-1dbf-450f-91b6-d55018b1ae00"];
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
    "/api/keysets/imports/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Remove the specified imported keyset. (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the keyset to remove. */
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
        "5cb56c4a-3fc3-4596-b78d-a16b38c7b6af": Record<string, never>;
        "59849635-aba3-4883-968d-762353f7c48b": components["schemas"]["d1cac24e-1dbf-450f-91b6-d55018b1ae00"][];
        "d1cac24e-1dbf-450f-91b6-d55018b1ae00": {
            /** @description (typeName=com.kosdev.kos.commons.util.Mode) */
            mode?: components["schemas"]["ae3735ba-5aa3-4457-8ddb-b8005e4bc177"];
            /** Format: int64 */
            date?: number;
            /** @description (typeName=com.kosdev.studio.app.service.keyset.KeySetService$KeyMaterial) */
            material?: components["schemas"]["bfd986a4-42c7-4c09-b75e-9497dc6eec18"];
            authority?: string;
            id?: string;
        };
        "ae3735ba-5aa3-4457-8ddb-b8005e4bc177": {
            value?: string;
        };
        "bfd986a4-42c7-4c09-b75e-9497dc6eec18": {
            /** @description (typeName=byte[]) */
            privateKey?: components["schemas"]["472a8306-30a3-4a52-9567-3fad9b57b60d"];
            /** @description (typeName=byte[]) */
            certPath?: components["schemas"]["472a8306-30a3-4a52-9567-3fad9b57b60d"];
        };
        "472a8306-30a3-4a52-9567-3fad9b57b60d": unknown;
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
