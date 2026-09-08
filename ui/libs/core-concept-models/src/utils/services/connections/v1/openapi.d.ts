export interface paths {
    "/api/connections": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the known connections. (v1.0) */
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
                        "application/json": components["schemas"]["6bce5058-6bcd-4c1e-9d82-bddb7cb551c9"];
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
    "/api/connections/{connId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Remove a connection from the list. This may be a target or vm-target connection. (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the connection to remove. */
                    connId: string;
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
    "/api/connections/{connId}/disconnect": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Disconnect from the specified connection. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the connection to disconnect from. */
                    connId: string;
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
    "/api/connections/{connId}/connect": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Connect to the specified connection. Only works for target connections. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the connection to connect to. */
                    connId: string;
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
    "/api/connections/tools": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Add a tool to a connection and open the tool. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["aaf4b794-1696-4271-b11e-aed6f02a9dd1"];
                };
            };
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/connections/tools/{toolId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Update settings for the tool with the specified id. (v1.0) */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the tool to open. */
                    toolId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["296600dc-f0ec-4300-9242-cc7f146cd71c"];
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
        /** Open the tool with the specified id. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the tool to open. */
                    toolId: string;
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
        /** Remove a tool with the specified id. (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the tool to remove. */
                    toolId: string;
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
    "/api/connections/targets/{target}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Add a target to the connection list and try to connect to it. Returns the connection id. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The target (ip address) to add. */
                    target: string;
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/connections/target/{targetId}/cached": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the cached target information. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The target (ip address) to add. */
                    targetId: string;
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
                        "application/json": components["schemas"]["8bdcfe51-2eae-427f-be3b-2dcd15cbfc68"];
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
    "/api/connections/target/{targetId}/live": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the live target information. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The target id to query. */
                    targetId: string;
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
                        "application/json": components["schemas"]["8bdcfe51-2eae-427f-be3b-2dcd15cbfc68"];
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
        "6bce5058-6bcd-4c1e-9d82-bddb7cb551c9": components["schemas"]["19dde643-9b36-4e66-9298-e7c75eb8fc4a"][];
        "19dde643-9b36-4e66-9298-e7c75eb8fc4a": {
            running?: boolean;
            targetId?: string;
            vmId?: string;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            compatibilty?: number;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.connection.ConnectionState) */
            state?: components["schemas"]["6df7b943-7c1e-4719-9cb6-4dfa1785baf0"];
            /** Format: int64 */
            lastUsedTime?: number;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.connection.Tool>) */
            tools?: components["schemas"]["68cea0c2-8e0f-4fde-9121-83785407358a"];
        };
        "6df7b943-7c1e-4719-9cb6-4dfa1785baf0": unknown;
        "68cea0c2-8e0f-4fde-9121-83785407358a": components["schemas"]["aaf4b794-1696-4271-b11e-aed6f02a9dd1"][];
        "aaf4b794-1696-4271-b11e-aed6f02a9dd1": {
            running?: boolean;
            visible?: boolean;
            /** Format: int64 */
            createTime?: number;
            autoOpen?: boolean;
            connId?: string;
            name?: string;
            id?: string;
            type?: string;
            url?: string;
        };
        "296600dc-f0ec-4300-9242-cc7f146cd71c": {
            visible?: boolean;
            autoOpen?: boolean;
            name?: string;
            json?: string;
        };
        "8bdcfe51-2eae-427f-be3b-2dcd15cbfc68": {
            nodeName?: string;
            mfgAuthority?: string;
            /** Format: int32 */
            nodeNameLock?: number;
            /** @description (typeName=java.util.List<java.lang.String>) */
            bootQueues?: components["schemas"]["23a4238e-6266-48fb-8b96-9dacf46aef12"];
            boardType?: string;
            vendorAuthority?: string;
            /** Format: int32 */
            primaryLock?: number;
            userName?: string;
            nodeType?: string;
            nonce?: string;
            /** Format: int32 */
            version?: number;
            /** Format: int32 */
            nodeTypeLock?: number;
            somType?: string;
            activeBootQueue?: string;
            userEmail?: string;
            arch?: string;
            manifestId?: string;
            /** Format: int32 */
            compatibility?: number;
            primary?: boolean;
        };
        "23a4238e-6266-48fb-8b96-9dacf46aef12": string[];
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
