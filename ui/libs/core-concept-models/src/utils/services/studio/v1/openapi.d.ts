export interface paths {
    "/api/studio/exit": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Exit studio (v1.0) */
        post: {
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
    "/api/studio/deepLink": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Handle a deep link request. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["74725db4-ea38-4027-a5e9-9b7c63421b68"];
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
    "/api/studio/browser": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Open the specified url in a system browser (v1.0) */
        post: {
            parameters: {
                query?: {
                    /** @description Query parameter containing the url to open. */
                    url?: string;
                };
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
    "/api/studio/context": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the bean context graph from the root. (v1.0) */
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
                        "application/json": components["schemas"]["ea9fd108-cb6e-4dd1-87a2-92a23982cd84"];
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
    "/api/studio/tools": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return information about the studio tools (v1.0) */
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
                        "application/json": Record<string, never>;
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
    "/api/studio/version": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the studio version (v1.0) */
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
                        "application/json": string;
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
    "/api/studio/resetSyncDB": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Delete the sync db and exit so it can reload on next restart. (v1.0) */
        post: {
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
    "/api/studio/info": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return information about the studio install (v1.0) */
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
                        "application/json": components["schemas"]["e4803364-88e9-404c-ab66-e08ccd472c62"];
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
        "74725db4-ea38-4027-a5e9-9b7c63421b68": {
            url?: string;
        };
        "ea9fd108-cb6e-4dd1-87a2-92a23982cd84": {
            /** @description (typeName=java.util.Collection<com.kosdev.kos.commons.core.context.BeanContext>) */
            children?: components["schemas"]["ee03fb00-3895-4428-af12-9640dfb65890"];
            /** @description (typeName=java.util.Collection<com.kosdev.kos.commons.core.context.CtxBeanInfo>) */
            pending?: components["schemas"]["e588e717-ceb7-4204-ad7c-4c6fd2adca07"];
            /** @description (typeName=java.util.Collection<com.kosdev.kos.commons.core.context.BeanContext$BeanView>) */
            beans?: components["schemas"]["73871d0d-846b-4ea4-9d6f-1257cfd77713"];
            name?: string;
        };
        "ee03fb00-3895-4428-af12-9640dfb65890": components["schemas"]["ea9fd108-cb6e-4dd1-87a2-92a23982cd84"][];
        "e588e717-ceb7-4204-ad7c-4c6fd2adca07": components["schemas"]["f2a059f6-a656-4656-a37c-bceb8e38b673"][];
        "f2a059f6-a656-4656-a37c-bceb8e38b673": {
            beanType?: string;
        };
        "73871d0d-846b-4ea4-9d6f-1257cfd77713": components["schemas"]["c0fb4e86-bc2b-4c99-b115-9ca70c980d7a"][];
        "c0fb4e86-bc2b-4c99-b115-9ca70c980d7a": {
            ready?: boolean;
            handleName?: string;
            /** @description (typeName=java.util.List<com.kosdev.kos.commons.core.context.BeanContext$ReadyView>) */
            pendingReady?: components["schemas"]["cb4f3a73-f302-45b2-9728-e6f1ca734b8a"];
            handlePath?: string;
            type?: string;
        };
        "cb4f3a73-f302-45b2-9728-e6f1ca734b8a": components["schemas"]["ebb115d3-a228-4c24-92c6-f75a66aff5bf"][];
        "ebb115d3-a228-4c24-92c6-f75a66aff5bf": {
            fieldName?: string;
            type?: string;
        };
        "e4803364-88e9-404c-ab66-e08ccd472c62": {
            /** @description (typeName=java.util.List<com.kosdev.studio.app.StudioInfo$KabInfo>) */
            ui?: components["schemas"]["61d79bff-4bd2-41c4-89ab-a60f52605b80"];
            /** @description (typeName=java.util.Collection<com.kosdev.kos.commons.path.NamedPath>) */
            paths?: components["schemas"]["3abe84d6-3962-4586-891f-fab88ae878ac"];
            version?: string;
            /** @description (typeName=java.util.Properties) */
            properties?: components["schemas"]["54a4be4a-0e12-47d7-aa4e-955d2847008d"];
        };
        "61d79bff-4bd2-41c4-89ab-a60f52605b80": components["schemas"]["5f906e92-7a16-4bdb-bca7-ce1deddfab36"][];
        "5f906e92-7a16-4bdb-bca7-ce1deddfab36": {
            gitHash?: string;
            name?: string;
            type?: string;
        };
        "3abe84d6-3962-4586-891f-fab88ae878ac": components["schemas"]["a5208144-1b8a-459a-90db-3ae44533b0fc"][];
        "a5208144-1b8a-459a-90db-3ae44533b0fc": {
            /** @description (typeName=java.io.File) */
            file?: components["schemas"]["f57b5262-d158-4ce2-9515-d51e0c749ff4"];
            name?: string;
        };
        "f57b5262-d158-4ce2-9515-d51e0c749ff4": {
            parent?: string;
            /** @description (typeName=java.io.File) */
            parentFile?: components["schemas"]["f57b5262-d158-4ce2-9515-d51e0c749ff4"];
            hidden?: boolean;
            /** Format: int64 */
            freeSpace?: number;
            /** Format: int64 */
            totalSpace?: number;
            /** Format: int64 */
            usableSpace?: number;
            directory?: boolean;
            /** @description (typeName=java.io.File) */
            canonicalFile?: components["schemas"]["f57b5262-d158-4ce2-9515-d51e0c749ff4"];
            path?: string;
            /** @description (typeName=java.io.File) */
            absoluteFile?: components["schemas"]["f57b5262-d158-4ce2-9515-d51e0c749ff4"];
            file?: boolean;
            absolute?: boolean;
            name?: string;
            canonicalPath?: string;
            absolutePath?: string;
        };
        "54a4be4a-0e12-47d7-aa4e-955d2847008d": Record<string, never>;
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
