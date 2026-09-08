export interface paths {
    "/api/srcTrees": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of available source trees (v1.0) */
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
                        "application/json": components["schemas"]["18b7e048-224d-401a-9aae-691537fd454d"];
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
    "/api/srcTrees/git": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the git name for the directory (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["2ab3a02a-43f8-4bb1-bd38-6de72bfb1ff0"];
                };
            };
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
    "/api/srcTrees/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create a new source tree (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["2ab3a02a-43f8-4bb1-bd38-6de72bfb1ff0"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["b2d95c60-ff66-4c61-92e5-342c333e36d5"];
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
    "/api/srcTrees/{srcTreeId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the specified source tree (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    srcTreeId: string;
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
                        "application/json": components["schemas"]["dba1e854-90b3-4fa8-b5c4-6ce6acfd6e2d"];
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
    "/api/srcTrees/{srcTreeId}/artifact/{artifactId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Add, update or delete a src tree artifact (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    srcTreeId: string;
                    artifactId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["5ef4ce85-33cf-4776-b2c2-2b0d3681884c"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dba1e854-90b3-4fa8-b5c4-6ce6acfd6e2d"];
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
    "/api/srcTrees/{srcTreeId}/scan": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Scan the specified src tree for changes in kabs (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    srcTreeId: string;
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
                        "application/json": components["schemas"]["311b1177-5042-4236-8e90-c08557e6431b"];
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
    "/api/srcTrees/{srcTreeId}/scanIgnores": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Update scanIgnore list for the src tree (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    srcTreeId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["c135bfa9-2e38-4370-a30f-8b531846efe1"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["dba1e854-90b3-4fa8-b5c4-6ce6acfd6e2d"];
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        "18b7e048-224d-401a-9aae-691537fd454d": components["schemas"]["dba1e854-90b3-4fa8-b5c4-6ce6acfd6e2d"][];
        "dba1e854-90b3-4fa8-b5c4-6ce6acfd6e2d": {
            /** @description (typeName=com.kosdev.studio.app.service.srctree.SrcTreeDef) */
            def?: components["schemas"]["819a0ce2-48cb-4bea-a0d3-09a83079499b"];
            error?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.SrcTreeSyncBean) */
            bean?: components["schemas"]["6c59962f-5cce-4dc7-a612-69fcfd7dde14"];
        };
        "819a0ce2-48cb-4bea-a0d3-09a83079499b": {
            /** @description (typeName=java.util.Set<java.lang.String>) */
            scanIgnores?: components["schemas"]["73fd5553-b7e8-4a00-b34a-b44241d0f77d"];
            /** Format: int32 */
            version?: number;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.srctree.SrcTreeDef$Artifact>) */
            artifacts?: components["schemas"]["738d5dd4-9e26-402d-9ff3-3077ec34eeed"];
        };
        "73fd5553-b7e8-4a00-b34a-b44241d0f77d": string[];
        "738d5dd4-9e26-402d-9ff3-3077ec34eeed": components["schemas"]["5ef4ce85-33cf-4776-b2c2-2b0d3681884c"][];
        "5ef4ce85-33cf-4776-b2c2-2b0d3681884c": {
            /** @description (typeName=java.util.List<java.lang.String>) */
            perspectives?: components["schemas"]["8e9aae11-4174-4f14-b9e1-55e14fbbf358"];
            artifactName?: string;
            qualifier?: string;
            optional?: boolean;
            kabType?: string;
            id?: string;
            layer?: boolean;
            relativeDir?: string;
        };
        "8e9aae11-4174-4f14-b9e1-55e14fbbf358": string[];
        "6c59962f-5cce-4dc7-a612-69fcfd7dde14": {
            hidden?: boolean;
            repoName?: string;
            opType?: string;
            error?: string;
            orgId?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            name?: string;
            refId?: string;
            id?: string;
            locked?: boolean;
            projectId?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.SrcTreeConfig) */
            config?: components["schemas"]["adcf48bb-9ad3-4b3e-ab81-2301deeff733"];
            desc?: string;
        };
        "adcf48bb-9ad3-4b3e-ab81-2301deeff733": {
            rootDir?: string;
        };
        "2ab3a02a-43f8-4bb1-bd38-6de72bfb1ff0": {
            name?: string;
            rootDir?: string;
        };
        "5cb56c4a-3fc3-4596-b78d-a16b38c7b6af": Record<string, never>;
        "b2d95c60-ff66-4c61-92e5-342c333e36d5": {
            /** @description (typeName=com.kosdev.studio.app.service.srctree.SrcTree) */
            srcTree?: components["schemas"]["dba1e854-90b3-4fa8-b5c4-6ce6acfd6e2d"];
            error?: string;
        };
        "311b1177-5042-4236-8e90-c08557e6431b": {
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.srctree.ScanResponse$Entry>) */
            entries?: components["schemas"]["e7bd8e81-983c-44dd-8665-2a263dbf9601"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.srctree.ScanResponse$ScanError>) */
            errors?: components["schemas"]["e68fcbd3-848d-4fbd-80e8-67b73b4ddf7e"];
        };
        "e7bd8e81-983c-44dd-8665-2a263dbf9601": components["schemas"]["c7dd4cea-7abc-458a-b80e-6bb3d3df42a0"][];
        "c7dd4cea-7abc-458a-b80e-6bb3d3df42a0": {
            /** @description (typeName=com.kosdev.studio.app.service.srctree.SrcTreeDef$Artifact) */
            artifact?: components["schemas"]["5ef4ce85-33cf-4776-b2c2-2b0d3681884c"];
            /** @description (typeName=com.kosdev.studio.app.service.srctree.SrcTreeDef$Artifact) */
            orig?: components["schemas"]["5ef4ce85-33cf-4776-b2c2-2b0d3681884c"];
            type?: string;
        };
        "e68fcbd3-848d-4fbd-80e8-67b73b4ddf7e": components["schemas"]["6c8e83ee-861d-45d3-84c7-36e8bf719bdc"][];
        "6c8e83ee-861d-45d3-84c7-36e8bf719bdc": {
            reason?: string;
            /** @description (typeName=java.io.File) */
            dir?: components["schemas"]["f57b5262-d158-4ce2-9515-d51e0c749ff4"];
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
        "c135bfa9-2e38-4370-a30f-8b531846efe1": string[];
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
