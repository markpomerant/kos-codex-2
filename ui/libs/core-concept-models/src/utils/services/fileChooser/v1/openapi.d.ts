export interface paths {
    "/api/fileChooser/files2": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the contents of the specified directory. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["66adc7aa-a983-47eb-ac3c-cad0e26de311"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["1c6ae659-a019-478a-9777-1a10f28b8bac"];
                    };
                };
            };
        };
        put?: never;
        /** Create a directory at the specified path. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["66adc7aa-a983-47eb-ac3c-cad0e26de311"];
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/fileChooser/files": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the contents of the root directory of the filesystem. (v1.0) */
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
                        "application/json": components["schemas"]["1c6ae659-a019-478a-9777-1a10f28b8bac"];
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
    "/api/fileChooser/files/{*path}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the contents of the specified directory. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The path to a directory. */
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
                        "application/json": components["schemas"]["1c6ae659-a019-478a-9777-1a10f28b8bac"];
                    };
                };
            };
        };
        put?: never;
        /** Create a directory at the specified path. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The path to the new directory. */
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
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/fileChooser/roots": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the roots of the filesystem (v1.0) */
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
                        "application/json": components["schemas"]["1c6ae659-a019-478a-9777-1a10f28b8bac"];
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
    "/api/fileChooser/home": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the home directory for the user (v1.0) */
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
                        "application/json": components["schemas"]["de17ead0-83a5-4b55-9983-0ebad4a594a3"];
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        "66adc7aa-a983-47eb-ac3c-cad0e26de311": {
            path?: string;
        };
        "1c6ae659-a019-478a-9777-1a10f28b8bac": components["schemas"]["de17ead0-83a5-4b55-9983-0ebad4a594a3"][];
        "de17ead0-83a5-4b55-9983-0ebad4a594a3": {
            hidden?: boolean;
            /** Format: int64 */
            size?: number;
            name?: string;
            /** Format: int64 */
            modified?: number;
            type?: string;
            /** @description (typeName=com.kosdev.studio.app.service.filechooser.ChooserKabInfo) */
            info?: components["schemas"]["2a403a56-a1d3-4d06-82ec-cbd24afeb5c7"];
        };
        "2a403a56-a1d3-4d06-82ec-cbd24afeb5c7": {
            mfgAuthority?: string;
            /** @description (typeName=com.kosdev.kos.commons.util.Mode) */
            mode?: components["schemas"]["ae3735ba-5aa3-4457-8ddb-b8005e4bc177"];
            identifier?: string;
            authority?: string;
            tag?: string;
            type?: string;
            version?: string;
        };
        "ae3735ba-5aa3-4457-8ddb-b8005e4bc177": {
            value?: string;
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
