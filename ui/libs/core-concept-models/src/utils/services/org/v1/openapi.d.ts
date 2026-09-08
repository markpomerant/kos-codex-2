export interface paths {
    "/api/org/runProfileShares": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all run profile shares. (v1.0) */
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
                        "application/json": components["schemas"]["8f16796d-8031-49ee-ac7e-19dc3ab6b276"];
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
    "/api/org/projects": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the projects in the org (v1.0) */
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
                        "application/json": components["schemas"]["e57f5868-2545-4fe8-a0f5-14749f477aad"];
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
    "/api/org/projects/active": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the currently active project (v1.0) */
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
                        "application/json": components["schemas"]["90195701-f0d5-464c-9d33-951c0fa56694"];
                    };
                };
            };
        };
        put?: never;
        /** Request the current project to be pushed to the message broker. (v1.0) */
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
    "/api/org/projects/active/{projectId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Set the active project (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the project to switch to */
                    projectId: string;
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
                        "application/json": components["schemas"]["90195701-f0d5-464c-9d33-951c0fa56694"];
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
    "/api/org/projects/{projectId}/links": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the project links for the specified project (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Project links for this project */
                    projectId: string;
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
                        "application/json": components["schemas"]["64e8c12e-b501-41d7-a766-2c7e3592de8e"];
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
    "/api/org/projects/links": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of all project links (v1.0) */
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
                        "application/json": components["schemas"]["64e8c12e-b501-41d7-a766-2c7e3592de8e"];
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
    "/api/org/folders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all folders. (v1.0) */
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
                        "application/json": components["schemas"]["b1e958ae-5862-4fb5-a74c-4bee297d0f90"];
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
    "/api/org/delegatedAuths": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the delegated auths related to this org (v1.0) */
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
                        "application/json": components["schemas"]["e9fad309-f05f-478e-babc-fa8dea596da6"];
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
    "/api/org/chainedManifests": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the chained manifests defined in the org. (v1.0) */
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
                        "application/json": components["schemas"]["032e2f93-78bb-48c7-bd0a-67f409ae195a"];
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
    "/api/org/releaseFlows": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the release flows for the current project. (v1.0) */
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
                        "application/json": components["schemas"]["8cc2b9a8-e49b-433f-aec5-c3ea07ada748"];
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
    "/api/org/studioGrants": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of studio grants. (v1.0) */
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
                        "application/json": components["schemas"]["de55baa0-4330-410d-85a7-e129f15246ff"];
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
    "/api/org/auditEntries/{name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the audit entries for the specified name. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    name: string;
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
                        "application/json": components["schemas"]["668728f4-34a3-4c34-85ed-1821c588d8bf"];
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
    "/api/org/directories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the directories defined in the org. (v1.0) */
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
                        "application/json": components["schemas"]["d69745b6-8cd9-40d2-9fc3-8256619f3972"];
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
    "/api/org/directories/{dirId}/config": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Set the local config for the specified directory object. This identifies the location of the
         *     logical directory in the local filesystem. (v1.0)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the logical directory to configure. */
                    dirId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["a354e0eb-a299-43e1-8d12-e94d2b8cddd0"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["d8a022a4-c5c1-4e63-b08e-d828aa4fcfb5"];
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
    "/api/org/invites": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of pending invitations for this org. (v1.0) */
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
                        "application/json": components["schemas"]["183b55ec-8002-4a03-9966-35c936c68df4"];
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
    "/api/org/fragments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the fragments defined in the org. (v1.0) */
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
                        "application/json": components["schemas"]["341c56e1-11ea-4ef6-9c7e-ff9a016426fa"];
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
    "/api/org/runProfileChainedManifests": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all run profile chained manifestss. (v1.0) */
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
                        "application/json": components["schemas"]["58970272-cddf-4f4e-b16e-8ec0087f6d4c"];
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
    "/api/org/artifactInfoByKabIds": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Given a list of kab id's, return corresponding instances and artifacts those instances are part of. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["8e9aae11-4174-4f14-b9e1-55e14fbbf358"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["e40a8ca0-bbb1-40cf-a5ee-9fefe8a353ac"];
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
    "/api/org/state": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the state of the org model. (v1.0) */
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
                        "application/json": components["schemas"]["2b1ecf20-5208-47e1-8d37-d780789e47ca"];
                    };
                };
            };
        };
        put?: never;
        /** Request the current model state be pushed to the message broker. (v1.0) */
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
    "/api/org/deviceGrants/received": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of device grants received by this org. (v1.0) */
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
                        "application/json": components["schemas"]["5c9829e7-7db1-4a64-a5c0-786e72207148"];
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
    "/api/org/deviceGrants/produced": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of device grants produced by this org. (v1.0) */
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
                        "application/json": components["schemas"]["5c9829e7-7db1-4a64-a5c0-786e72207148"];
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
    "/api/org/artifacts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the artifacts in the org. (v1.0) */
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
                        "application/json": components["schemas"]["88b66a19-2c05-4998-b1b4-3e30a35297ea"];
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
    "/api/org/artifacts/summary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return a summary of org artifacts. (v1.0) */
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
                        "application/json": components["schemas"]["7559f843-4acc-4283-8348-04b8e835aafb"];
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
    "/api/org/artifacts/{artifactId}/instances": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the intances available for the specified org artifact. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    artifactId: string;
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
                        "application/json": components["schemas"]["a7a5bff4-b55b-4431-9998-42802ea62c51"];
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
    "/api/org/op": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Submit one or more operations to be performed (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["e4261594-650f-47b7-a745-864385f450d0"];
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
    "/api/org/folderLinks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all folders links. (v1.0) */
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
                        "application/json": components["schemas"]["87541eb3-f320-4536-b31d-0f06ea8d99fe"];
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
    "/api/org/srcTrees/{srcTreeId}/config": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Set the local config for the specified src tree object. This identifies the location of the
         *     logical src tree in the local filesystem. (v1.0)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the src tree to configure. */
                    srcTreeId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["adcf48bb-9ad3-4b3e-ab81-2301deeff733"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["6c59962f-5cce-4dc7-a612-69fcfd7dde14"];
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
    "/api/org/projectAuditEntries/{linkId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the audit entries for the specified project linkId. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    linkId: string;
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
                        "application/json": components["schemas"]["b07a6770-1f10-4a33-abb7-b42da211dbbc"];
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
    "/api/org/allUserPermissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all user permissions. (v1.0) */
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
                        "application/json": components["schemas"]["ba6e1ec2-31fd-471e-8ca9-6155f13e35d3"];
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
    "/api/org/profiles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the simulator profiles defined in the org (v1.0) */
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
                        "application/json": components["schemas"]["345caa80-e000-4814-8520-ec99665564f2"];
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
    "/api/org/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of org users for this org. (v1.0) */
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
                        "application/json": components["schemas"]["0b4f36f9-bca6-4384-a12d-4e3757bf5532"];
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
    "/api/org/tags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the tags defined in the org (v1.0) */
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
                        "application/json": components["schemas"]["f7c2682c-a27b-46a8-a321-fee6e82cb94e"];
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
    "/api/org/tags/favorites": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the tags that the user has marked as favorites (v1.0) */
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
                        "application/json": components["schemas"]["420af278-c7d1-4f09-a483-6ee5466e407e"];
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
    "/api/org/releases": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of all known releases from the server. (v1.0) */
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
                        "application/json": components["schemas"]["e5c18241-00ee-42c5-a27d-16b70c06e389"];
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
    "/api/org/releases/channels": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of release channels visible to the user. (v1.0) */
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
                        "application/json": components["schemas"]["3646cc0f-6c4f-4714-b175-365a14be02b9"];
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
    "/api/org/deviceGrantTemplates": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of device grant templates (v1.0) */
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
                        "application/json": components["schemas"]["b1d5ce62-acf2-4225-ba3a-cd27cedbfdc2"];
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
    "/api/org/market/grants/artifacts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the artifact grants related to this org (v1.0) */
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
                        "application/json": components["schemas"]["1da40e9e-42d6-47be-a0f2-cd16ddd1da30"];
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
    "/api/org/market/repos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of market repos. (v1.0) */
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
                        "application/json": components["schemas"]["6e905def-3a02-4c90-a977-8aa629c6a134"];
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
    "/api/org/market/repos/{repoId}/config": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Set the local config for the specified market repo. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the repo to update. */
                    repoId: string;
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
                    content: {
                        "application/json": components["schemas"]["8e912d21-ab8a-438f-a54e-e8e1cde1910c"];
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
    "/api/org/market/links": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the market links for this org (v1.0) */
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
                        "application/json": components["schemas"]["d4887faf-387f-4b65-87cb-feb118560b21"];
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
    "/api/org/market/orgs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the orgs available in the market (v1.0) */
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
                        "application/json": components["schemas"]["a28fc3c5-7de0-4ecb-a432-3fe17af9c2d7"];
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
    "/api/org/market/artifacts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the artifacts available in the market (v1.0) */
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
                        "application/json": components["schemas"]["88b66a19-2c05-4998-b1b4-3e30a35297ea"];
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
    "/api/org/ops": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Submit one or more operations to be performed (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["e4261594-650f-47b7-a745-864385f450d0"];
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
    "/api/org/virtualArtifacts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the virtual artifacts in the org. (v1.0) */
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
                        "application/json": components["schemas"]["4d4dbc1a-91bd-444b-9dc1-eafc174c8cdc"];
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
    "/api/org/marketArtifactImports": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the market artifact imports. (v1.0) */
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
                        "application/json": components["schemas"]["526de002-3dbd-47ee-90ad-8c3b58b37daa"];
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
    "/api/org/repos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of org-specific repos. (v1.0) */
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
                        "application/json": components["schemas"]["6e905def-3a02-4c90-a977-8aa629c6a134"];
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
    "/api/org/repos/{repoId}/config": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Set the local config for the specified org repo. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the repo to update. */
                    repoId: string;
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
                    content: {
                        "application/json": components["schemas"]["8e912d21-ab8a-438f-a54e-e8e1cde1910c"];
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
    "/api/org/runProfiles": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all run profiles. (v1.0) */
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
                        "application/json": components["schemas"]["18295d4d-ba70-4620-9b14-8c189be6db52"];
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
    "/api/org/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of messages from the server. (v1.0) */
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
                        "application/json": components["schemas"]["d810d9b8-cd7b-4ab7-a385-e3abbe9d0956"];
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
    "/api/org/messages/{msgId}/read": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Set the read flag for the specified message. (v1.0) */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The id of the message to update. */
                    msgId: string;
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
                        "application/json": components["schemas"]["6ca21529-88e7-434a-b5f6-fbb28a2dfc58"];
                    };
                };
            };
        };
        post?: never;
        /** Clear the read flag for the specified message. (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The id of the message to update. */
                    msgId: string;
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
                        "application/json": components["schemas"]["6ca21529-88e7-434a-b5f6-fbb28a2dfc58"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/org/messages/{msgId}/acknowledged": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Set the acknowledged flag for the specified message. (v1.0) */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The id of the message to update. */
                    msgId: string;
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
                        "application/json": components["schemas"]["6ca21529-88e7-434a-b5f6-fbb28a2dfc58"];
                    };
                };
            };
        };
        post?: never;
        /** Clear the acknowledged flag for the specified message. (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The id of the message to update. */
                    msgId: string;
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
                        "application/json": components["schemas"]["6ca21529-88e7-434a-b5f6-fbb28a2dfc58"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/org/messages/{msgId}/hidden": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Set the hidden flag for the specified message. (v1.0) */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The id of the message to update. */
                    msgId: string;
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
                        "application/json": components["schemas"]["6ca21529-88e7-434a-b5f6-fbb28a2dfc58"];
                    };
                };
            };
        };
        post?: never;
        /** Clear the hidden flag for the specified message. (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The id of the message to update. */
                    msgId: string;
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
                        "application/json": components["schemas"]["6ca21529-88e7-434a-b5f6-fbb28a2dfc58"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/org/projectBlobs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all project blobs in the project. (v1.0) */
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
                        "application/json": components["schemas"]["a6b204bc-1d86-43ce-b580-6720da3e3252"];
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
    "/api/org/projectBlobs/{type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return project blobs of the specified type in the project. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    type: string;
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
                        "application/json": components["schemas"]["a6b204bc-1d86-43ce-b580-6720da3e3252"];
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
    "/api/org/currentUserPermissions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return permissions for current user. (v1.0) */
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
                        "application/json": components["schemas"]["ba6e1ec2-31fd-471e-8ca9-6155f13e35d3"];
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
    "/api/org/srcTreePerspectives": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the custom src tree perspectives in the org. (v1.0) */
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
                        "application/json": components["schemas"]["d0baa353-4321-4ae1-9333-bca2e299b0f5"];
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
    "/api/org/releaseFlowNodes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the release flow nodes for the current project. (v1.0) */
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
                        "application/json": components["schemas"]["2c4731a4-b733-4546-be1d-7717a80ee984"];
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
    "/api/org/runProfilePerspectives": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all run profile perspectives. (v1.0) */
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
                        "application/json": components["schemas"]["51d892d7-e5cd-4ab0-8e0d-31bdf16ea14d"];
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
        "8f16796d-8031-49ee-ac7e-19dc3ab6b276": components["schemas"]["10db6968-6256-4ba0-a840-b39d712c9949"][];
        "10db6968-6256-4ba0-a840-b39d712c9949": {
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            refId?: string;
            id?: string;
            error?: string;
            projectId?: string;
            runProfileId?: string;
            userId?: string;
            orgId?: string;
        };
        "e57f5868-2545-4fe8-a0f5-14749f477aad": components["schemas"]["90195701-f0d5-464c-9d33-951c0fa56694"][];
        "90195701-f0d5-464c-9d33-951c0fa56694": {
            hidden?: boolean;
            opType?: string;
            error?: string;
            orgId?: string;
            deleted?: boolean;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            restricted?: boolean;
            name?: string;
            refId?: string;
            id?: string;
            locked?: boolean;
            desc?: string;
        };
        "64e8c12e-b501-41d7-a766-2c7e3592de8e": components["schemas"]["442376f5-ccc7-47b1-b8f5-5e954a52389c"][];
        "442376f5-ccc7-47b1-b8f5-5e954a52389c": {
            chainedManifestId?: string;
            opType?: string;
            error?: string;
            userId?: string;
            orgId?: string;
            virtualArtifactId?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            marketArtifactImportId?: string;
            fragmentId?: string;
            artifactId?: string;
            refId?: string;
            id?: string;
            projectId?: string;
        };
        "b1e958ae-5862-4fb5-a74c-4bee297d0f90": components["schemas"]["6e32ad81-ad51-4758-b6a9-786892bd8dfd"][];
        "6e32ad81-ad51-4758-b6a9-786892bd8dfd": {
            hidden?: boolean;
            opType?: string;
            error?: string;
            type?: string;
            orgId?: string;
            parentId?: string;
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
        };
        "e9fad309-f05f-478e-babc-fa8dea596da6": components["schemas"]["77de6be1-f29d-4c2f-b6cf-84520bf20f33"][];
        "77de6be1-f29d-4c2f-b6cf-84520bf20f33": {
            partnerOrgName?: string;
            opType?: string;
            error?: string;
            orgId?: string;
            keysetId?: string;
            partnerOrgId?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            authority?: string;
            partnerAuthority?: string;
            refId?: string;
            id?: string;
        };
        "032e2f93-78bb-48c7-bd0a-67f409ae195a": components["schemas"]["a86de922-dba0-4c93-a91b-b2941a2bbbfe"][];
        "a86de922-dba0-4c93-a91b-b2941a2bbbfe": {
            manifestAuth?: string;
            hidden?: boolean;
            opType?: string;
            manifestName?: string;
            error?: string;
            orgId?: string;
            allProjects?: boolean;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            name?: string;
            refId?: string;
            id?: string;
            locked?: boolean;
            desc?: string;
        };
        "8cc2b9a8-e49b-433f-aec5-c3ea07ada748": components["schemas"]["1c726b90-6ffd-4ab4-b423-50154fbc5e9d"][];
        "1c726b90-6ffd-4ab4-b423-50154fbc5e9d": {
            hidden?: boolean;
            rootNodeId?: string;
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
            desc?: string;
        };
        "de55baa0-4330-410d-85a7-e129f15246ff": components["schemas"]["4fc2e2ef-7c03-4125-9891-143635a2125c"][];
        "4fc2e2ef-7c03-4125-9891-143635a2125c": {
            val?: string;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            v?: number;
            opType?: string;
            name?: string;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
            hash?: string;
        };
        "668728f4-34a3-4c34-85ed-1821c588d8bf": components["schemas"]["c81fdde8-2e4f-4bc2-8226-7bc0aebf73de"][];
        "c81fdde8-2e4f-4bc2-8226-7bc0aebf73de": {
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            name?: string;
            json?: string;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
        };
        "d69745b6-8cd9-40d2-9fc3-8256619f3972": components["schemas"]["d8a022a4-c5c1-4e63-b08e-d828aa4fcfb5"][];
        "d8a022a4-c5c1-4e63-b08e-d828aa4fcfb5": {
            hidden?: boolean;
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
            /** @description (typeName=com.kosdev.studio.commons.sync.data.DirConfig) */
            config?: components["schemas"]["a354e0eb-a299-43e1-8d12-e94d2b8cddd0"];
            desc?: string;
        };
        "a354e0eb-a299-43e1-8d12-e94d2b8cddd0": {
            basePath?: string;
        };
        "183b55ec-8002-4a03-9966-35c936c68df4": components["schemas"]["6fc86eae-169b-43e4-a784-1bfacbd1c9e0"][];
        "6fc86eae-169b-43e4-a784-1bfacbd1c9e0": {
            notes?: string;
            role?: string;
            opType?: string;
            error?: string;
            orgId?: string;
            tokenHash?: string;
            token?: string;
            identity2?: string;
            /** Format: int64 */
            expireTime?: number;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            emailHash?: string;
            refId?: string;
            id?: string;
            email?: string;
        };
        "341c56e1-11ea-4ef6-9c7e-ff9a016426fa": components["schemas"]["3446d695-e9a4-4ddb-917f-3431317334ca"][];
        "3446d695-e9a4-4ddb-917f-3431317334ca": {
            hidden?: boolean;
            opType?: string;
            error?: string;
            orgId?: string;
            allProjects?: boolean;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            name?: string;
            refId?: string;
            id?: string;
            locked?: boolean;
            desc?: string;
        };
        "58970272-cddf-4f4e-b16e-8ec0087f6d4c": components["schemas"]["0f17cc8d-102f-4e00-afb7-06e98bfd4309"][];
        "0f17cc8d-102f-4e00-afb7-06e98bfd4309": {
            /** Format: int64 */
            createTime?: number;
            chainedManifestId?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            disabled?: boolean;
            refId?: string;
            id?: string;
            error?: string;
            projectId?: string;
            runProfileId?: string;
            orgId?: string;
        };
        "8e9aae11-4174-4f14-b9e1-55e14fbbf358": string[];
        "e40a8ca0-bbb1-40cf-a5ee-9fefe8a353ac": {
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.ArtifactInstanceSyncBean>) */
            instances?: components["schemas"]["728882f0-7ae1-45cc-9792-d83f8a24b04d"];
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.ArtifactSyncBean>) */
            artifacts?: components["schemas"]["88b66a19-2c05-4998-b1b4-3e30a35297ea"];
        };
        "728882f0-7ae1-45cc-9792-d83f8a24b04d": components["schemas"]["b9c578bd-d9c5-4884-8975-59eb15d0a4a4"][];
        "b9c578bd-d9c5-4884-8975-59eb15d0a4a4": {
            repoId?: string;
            hidden?: boolean;
            opType?: string;
            deprecated?: boolean;
            miniHash?: string;
            repoLocation?: string;
            kabType?: string;
            error?: string;
            version?: string;
            orgId?: string;
            kabIdentifier?: string;
            market?: boolean;
            immutable?: boolean;
            /** Format: int64 */
            size?: number;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            v?: number;
            qualifier?: string;
            bundleJson?: string;
            artifactId?: string;
            refId?: string;
            id?: string;
            bundle?: boolean;
            hash?: string;
            desc?: string;
        };
        "88b66a19-2c05-4998-b1b4-3e30a35297ea": components["schemas"]["1a159325-9581-4a5c-aa2a-efc89f37d99e"][];
        "1a159325-9581-4a5c-aa2a-efc89f37d99e": {
            hidden?: boolean;
            releasableNotNull?: boolean;
            displayName?: string;
            opType?: string;
            releasable?: boolean;
            /** Format: int64 */
            lastPublished?: number;
            error?: string;
            type?: string;
            orgId?: string;
            allProjects?: boolean;
            market?: boolean;
            internalName?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            restricted?: boolean;
            name?: string;
            refId?: string;
            id?: string;
            locked?: boolean;
            desc?: string;
        };
        "2b1ecf20-5208-47e1-8d37-d780789e47ca": {
            syncInProgress?: boolean;
            connected?: boolean;
            syncSuccess?: boolean;
            ready?: boolean;
            mutable?: boolean;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.ProjectSyncBean) */
            project?: components["schemas"]["90195701-f0d5-464c-9d33-951c0fa56694"];
            closed?: boolean;
            remote?: boolean;
            orgId?: string;
        };
        "5c9829e7-7db1-4a64-a5c0-786e72207148": components["schemas"]["73226361-a8a8-4e6e-93cf-107fabbcc995"][];
        "73226361-a8a8-4e6e-93cf-107fabbcc995": {
            repoId?: string;
            grantJson?: string;
            opType?: string;
            miniHash?: string;
            repoLocation?: string;
            error?: string;
            templateId?: string;
            orgId?: string;
            partnerOrgId?: string;
            /** Format: int64 */
            size?: number;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            kabId?: string;
            name?: string;
            /** Format: int32 */
            templateVersion?: number;
            refId?: string;
            id?: string;
            hash?: string;
        };
        "7559f843-4acc-4283-8348-04b8e835aafb": {
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.ArtifactSyncBean>) */
            marketArtifacts?: components["schemas"]["88b66a19-2c05-4998-b1b4-3e30a35297ea"];
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.MarketOrgSyncBean>) */
            marketOrgs?: components["schemas"]["a28fc3c5-7de0-4ecb-a432-3fe17af9c2d7"];
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.ArtifactSyncBean>) */
            artifacts?: components["schemas"]["88b66a19-2c05-4998-b1b4-3e30a35297ea"];
        };
        "a28fc3c5-7de0-4ecb-a432-3fe17af9c2d7": components["schemas"]["e34ea8e7-1a54-4551-8829-19b05495adaf"][];
        "e34ea8e7-1a54-4551-8829-19b05495adaf": {
            hidden?: boolean;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            v?: number;
            opType?: string;
            authority?: string;
            name?: string;
            refId?: string;
            error?: string;
            orgId?: string;
            desc?: string;
        };
        "a7a5bff4-b55b-4431-9998-42802ea62c51": {
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.ArtifactInstanceSyncBean>) */
            instances?: components["schemas"]["728882f0-7ae1-45cc-9792-d83f8a24b04d"];
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.ArtifactRepoSyncBean>) */
            repos?: components["schemas"]["6e905def-3a02-4c90-a977-8aa629c6a134"];
        };
        "6e905def-3a02-4c90-a977-8aa629c6a134": components["schemas"]["8e912d21-ab8a-438f-a54e-e8e1cde1910c"][];
        "8e912d21-ab8a-438f-a54e-e8e1cde1910c": {
            configured?: boolean;
            opType?: string;
            error?: string;
            type?: string;
            orgId?: string;
            market?: boolean;
            internalName?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            name?: string;
            json?: string;
            refId?: string;
            id?: string;
            locked?: boolean;
            desc?: string;
        };
        "e4261594-650f-47b7-a745-864385f450d0": {
            integralNumber?: boolean;
            double?: boolean;
            valueNode?: boolean;
            floatingPointNumber?: boolean;
            bigInteger?: boolean;
            /** @description (typeName=com.fasterxml.jackson.databind.node.JsonNodeType) */
            nodeType?: components["schemas"]["73198b47-c118-437f-9055-442508c90b05"];
            float?: boolean;
            int?: boolean;
            long?: boolean;
            textual?: boolean;
            empty?: boolean;
            missingNode?: boolean;
            pojo?: boolean;
            number?: boolean;
            boolean?: boolean;
            null?: boolean;
            array?: boolean;
            binary?: boolean;
            containerNode?: boolean;
            short?: boolean;
            bigDecimal?: boolean;
            object?: boolean;
        };
        "73198b47-c118-437f-9055-442508c90b05": unknown;
        "87541eb3-f320-4536-b31d-0f06ea8d99fe": components["schemas"]["0a63d002-963b-46c5-8791-5f3b84a1ea12"][];
        "0a63d002-963b-46c5-8791-5f3b84a1ea12": {
            opType?: string;
            error?: string;
            type?: string;
            orgId?: string;
            folderId?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            marketArtifactImportId?: string;
            artifactId?: string;
            refId?: string;
            id?: string;
            projectId?: string;
        };
        "adcf48bb-9ad3-4b3e-ab81-2301deeff733": {
            rootDir?: string;
        };
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
        "b07a6770-1f10-4a33-abb7-b42da211dbbc": components["schemas"]["5b9963fa-6d64-41b1-abd8-3d2ed00ef9ac"][];
        "5b9963fa-6d64-41b1-abd8-3d2ed00ef9ac": {
            linkId?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            vmId?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            json?: string;
            refId?: string;
            id?: string;
            error?: string;
            projectId?: string;
            orgId?: string;
        };
        "ba6e1ec2-31fd-471e-8ca9-6155f13e35d3": components["schemas"]["8bf9edd6-d267-42d7-a626-4c8a668067c4"][];
        "8bf9edd6-d267-42d7-a626-4c8a668067c4": {
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            permission?: string;
            refId?: string;
            id?: string;
            error?: string;
            userId?: string;
            orgId?: string;
        };
        "345caa80-e000-4814-8520-ec99665564f2": components["schemas"]["77dbd709-8f57-43cf-9cf1-5f34bd837820"][];
        "77dbd709-8f57-43cf-9cf1-5f34bd837820": {
            /** Format: int32 */
            screenWidth?: number;
            hidden?: boolean;
            opType?: string;
            /** Format: int32 */
            screenHeight?: number;
            error?: string;
            orgId?: string;
            /** Format: int32 */
            diskSize?: number;
            /** Format: int32 */
            memorySize?: number;
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
            desc?: string;
        };
        "0b4f36f9-bca6-4384-a12d-4e3757bf5532": components["schemas"]["1b5bfe7c-480d-4967-b503-1435d0a3bc43"][];
        "1b5bfe7c-480d-4967-b503-1435d0a3bc43": {
            notes?: string;
            role?: string;
            opType?: string;
            /** Format: int64 */
            suspendTime?: number;
            /** Format: int64 */
            globalSuspendTime?: number;
            error?: string;
            orgId?: string;
            identity2?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            name?: string;
            refId?: string;
            id?: string;
            serverUserId?: string;
            email?: string;
        };
        "f7c2682c-a27b-46a8-a321-fee6e82cb94e": components["schemas"]["566b7664-0064-4977-9b11-1a3120a26309"][];
        "566b7664-0064-4977-9b11-1a3120a26309": {
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            name?: string;
            refId?: string;
            id?: string;
            error?: string;
            locked?: boolean;
            type?: string;
            projectId?: string;
            orgId?: string;
        };
        "420af278-c7d1-4f09-a483-6ee5466e407e": components["schemas"]["d7fb1da8-4827-48e1-9de3-8653a17411f1"][];
        "d7fb1da8-4827-48e1-9de3-8653a17411f1": {
            /** Format: int64 */
            createTime?: number;
            tagId?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            refId?: string;
            id?: string;
            error?: string;
            userId?: string;
            orgId?: string;
        };
        "e5c18241-00ee-42c5-a27d-16b70c06e389": components["schemas"]["36981284-7561-497f-a6a8-b9273fa53c32"][];
        "36981284-7561-497f-a6a8-b9273fa53c32": {
            hidden?: boolean;
            opType?: string;
            error?: string;
            version?: string;
            orgId?: string;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            v?: number;
            name?: string;
            json?: string;
            refId?: string;
            id?: string;
            channelId?: string;
            desc?: string;
        };
        "3646cc0f-6c4f-4714-b175-365a14be02b9": components["schemas"]["1ce27179-dd96-4810-b475-545e45d98c74"][];
        "1ce27179-dd96-4810-b475-545e45d98c74": {
            ref?: string;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            v?: number;
            opType?: string;
            name?: string;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
            open?: boolean;
            desc?: string;
        };
        "b1d5ce62-acf2-4225-ba3a-cd27cedbfdc2": components["schemas"]["ce70f090-82a2-4f6a-a816-44296ff96942"][];
        "ce70f090-82a2-4f6a-a816-44296ff96942": {
            grantJson?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            name?: string;
            refId?: string;
            id?: string;
            error?: string;
            /** Format: int32 */
            version?: number;
            orgId?: string;
        };
        "1da40e9e-42d6-47be-a0f2-cd16ddd1da30": components["schemas"]["92a12edc-f2ab-4b03-8f6b-28d26825e09e"][];
        "92a12edc-f2ab-4b03-8f6b-28d26825e09e": {
            partnerOrgId?: string;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            v?: number;
            opType?: string;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
            marketArtifactId?: string;
            marketLinkId?: string;
        };
        "d4887faf-387f-4b65-87cb-feb118560b21": components["schemas"]["3f761960-25d2-4deb-bb58-3083b3094fb7"][];
        "3f761960-25d2-4deb-bb58-3083b3094fb7": {
            partnerOrgId?: string;
            partnerOrgName?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            /** Format: int64 */
            suspendTime?: number;
            partnerAuthority?: string;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
        };
        "4d4dbc1a-91bd-444b-9dc1-eafc174c8cdc": components["schemas"]["75030978-4fc6-4851-a38c-956bd45ce6d1"][];
        "75030978-4fc6-4851-a38c-956bd45ce6d1": {
            hidden?: boolean;
            opType?: string;
            error?: string;
            type?: string;
            version?: string;
            orgId?: string;
            allProjects?: boolean;
            marketArtifactId?: string;
            market?: boolean;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            name?: string;
            artifactId?: string;
            refId?: string;
            id?: string;
            locked?: boolean;
            desc?: string;
        };
        "526de002-3dbd-47ee-90ad-8c3b58b37daa": components["schemas"]["082897d5-f538-4f5e-85c2-9a30444ef93e"][];
        "082897d5-f538-4f5e-85c2-9a30444ef93e": {
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
            allProjects?: boolean;
            marketArtifactId?: string;
        };
        "18295d4d-ba70-4620-9b14-8c189be6db52": components["schemas"]["045476ab-fe2a-4863-9124-2df1bc8e91ea"][];
        "045476ab-fe2a-4863-9124-2df1bc8e91ea": {
            hidden?: boolean;
            opType?: string;
            error?: string;
            ownerId?: string;
            orgId?: string;
            /** Format: int32 */
            runMode?: number;
            shareMode?: string;
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
            desc?: string;
        };
        "d810d9b8-cd7b-4ab7-a385-e3abbe9d0956": components["schemas"]["6ca21529-88e7-434a-b5f6-fbb28a2dfc58"][];
        "6ca21529-88e7-434a-b5f6-fbb28a2dfc58": {
            read?: boolean;
            acknowledged?: boolean;
            hidden?: boolean;
            opType?: string;
            error?: string;
            title?: string;
            body?: string;
            type?: string;
            orgId?: string;
            /** Format: int64 */
            expireTime?: number;
            /** Format: int64 */
            createTime?: number;
            sender?: string;
            alert?: boolean;
            /** Format: int32 */
            v?: number;
            recvOrgId?: string;
            refId?: string;
            id?: string;
        };
        "a6b204bc-1d86-43ce-b580-6720da3e3252": components["schemas"]["77cc81e0-7a62-499f-93fb-5f1841e4b3a5"][];
        "77cc81e0-7a62-499f-93fb-5f1841e4b3a5": {
            opType?: string;
            error?: string;
            ownerId?: string;
            type?: string;
            orgId?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            name?: string;
            refId?: string;
            id?: string;
            projectId?: string;
            value?: string;
        };
        "d0baa353-4321-4ae1-9333-bca2e299b0f5": components["schemas"]["de780041-1582-4d74-a986-e1ef9e360a49"][];
        "de780041-1582-4d74-a986-e1ef9e360a49": {
            hidden?: boolean;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            name?: string;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
        };
        "2c4731a4-b733-4546-be1d-7717a80ee984": components["schemas"]["fa9b08ee-2974-4805-b637-1aabcf608316"][];
        "fa9b08ee-2974-4805-b637-1aabcf608316": {
            hidden?: boolean;
            vmId?: string;
            opType?: string;
            parentNodeId?: string;
            error?: string;
            type?: string;
            orgId?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            name?: string;
            json?: string;
            refId?: string;
            id?: string;
            locked?: boolean;
            projectId?: string;
            flowId?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.ReleaseFlowNodeConfig) */
            config?: components["schemas"]["14c4e53f-59f2-4563-aa67-28bf6dd9544b"];
            desc?: string;
        };
        "14c4e53f-59f2-4563-aa67-28bf6dd9544b": {
            closed?: boolean;
        };
        "51d892d7-e5cd-4ab0-8e0d-31bdf16ea14d": components["schemas"]["011432f6-e1ef-4632-8ec1-55c6a2cdb9bb"][];
        "011432f6-e1ef-4632-8ec1-55c6a2cdb9bb": {
            internalPerspective?: string;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            v?: number;
            opType?: string;
            srcTreePerspectiveId?: string;
            refId?: string;
            id?: string;
            error?: string;
            projectId?: string;
            runProfileId?: string;
            orgId?: string;
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
