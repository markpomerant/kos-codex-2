export interface paths {
    "/api/vms": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of available vms (v1.0) */
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
                        "application/json": components["schemas"]["ad2f0a48-6e5c-4397-ab70-3a7365ea7061"];
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
    "/api/vms/op": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Submit a vm operation for processing (v1.0) */
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
                    content: {
                        "application/json": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"];
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
    "/api/vms/ops": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Submit a vm operation for processing (v1.0) */
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
                    content: {
                        "application/json": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"];
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
    "/api/vms/debug": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Start / bounce the target with the artifacts defined in the vm on the currently selected target.
         *     This will pick up any local artifact changes and push them to the vm. (v1.0)
         */
        post: {
            parameters: {
                query?: {
                    /** @description Name of the vm to bounce. */
                    name?: string;
                    /** @description Target the vm is running on. */
                    target?: string;
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
                    content: {
                        "application/json": components["schemas"]["cef11873-6a5e-4b21-a4ae-dd029a36f6f4"];
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
    "/api/vms/install": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Install a list of vm-targets. If the target portion of the vm-target is not specified, the
         *     default for the vm will be used. Install survives reboots. (v1.0)
         */
        post: {
            parameters: {
                query?: {
                    /** @description Optional id of the keySet to use for the manifest. */
                    keySetId?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["ea92363d-4c5a-4fd9-bb1f-525408219a92"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["cef11873-6a5e-4b21-a4ae-dd029a36f6f4"];
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
    "/api/vms/reloadCache": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Trigger a vm cache reload. (v1.0) */
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
                    content?: never;
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
    "/api/vms/start": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Start a list of vm-targets. If the target portion of the vm-target is not specified, the
         *     default for the vm will be used. Start only survives a single reboot whereas install
         *     survives multiple reboots. (v1.0)
         */
        post: {
            parameters: {
                query?: {
                    /** @description Optional id of the keySet to use for the manifest. */
                    keySetId?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["ea92363d-4c5a-4fd9-bb1f-525408219a92"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["cef11873-6a5e-4b21-a4ae-dd029a36f6f4"];
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
    "/api/vms/groups": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all currently running run groups. (v1.0) */
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
                        "application/json": components["schemas"]["257859e8-dac8-4fd2-a30b-894926165ba7"];
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
    "/api/vms/groups/{groupId}/stop": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Stop all vm-targets in the specified run group. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the run group to stop. */
                    groupId: string;
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
    "/api/vms/{vmId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the specified vm (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the vm to return. */
                    vmId: string;
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
                        "application/json": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"];
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
    "/api/vms/{vmId}/localDevFlags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create local developer flags for the specified vm. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the vm to add the local developer flags to. */
                    vmId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["62c41294-d54e-4c0a-8689-b0e7795850e4"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"];
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
    "/api/vms/{vmId}/squash": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the squash file that will be used when the vm is run, including expanded paths. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the vm containing the squash. */
                    vmId: string;
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
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/vms/{infoId}/stop": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Stop the running target with the specified infoId. This id is returned as part of the
         *     run group when one or more vm's are started. This will only stop the one vm-target in
         *     the group. If this is the last vm-target in the group, the group will also be stopped
         *     which will generate group lifecycle events. (v1.0)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The infoId from the run group which indicates a specific vm-target. */
                    infoId: string;
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
    "/api/vms/{vmId}/install": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Install the artifacts defined in the vm on the currently selected target. Install survives
         *     across multiple reboots whereas start only survives for a single reboot (v1.0)
         */
        post: {
            parameters: {
                query?: {
                    /** @description Optional id of the keySet to use for the manifest. */
                    keySetId?: string;
                };
                header?: never;
                path: {
                    /** @description Id of the vm to install on the selected target. */
                    vmId: string;
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
                        "application/json": components["schemas"]["cef11873-6a5e-4b21-a4ae-dd029a36f6f4"];
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
    "/api/vms/{vmId}/localPortMap": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Update a local port map for the specified vm. (v1.0) */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the vm the port map is associated with. */
                    vmId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["b3f65623-6070-4823-9ad3-2444d1c40f69"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"];
                    };
                };
            };
        };
        /** Create a local port map for the specified vm. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the vm to add the local port map to. */
                    vmId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["b3f65623-6070-4823-9ad3-2444d1c40f69"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"];
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
    "/api/vms/{vmId}/localPortMap/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete the specified local port map from the vm. (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the vm to remove the port map from */
                    vmId: string;
                    /** @description Id of the local port map to remove */
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
                    content: {
                        "application/json": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/vms/{vmId}/start": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Start the target with the artifacts defined in the vm on the currently selected target.
         *     Start only survives a single reboot whereas install survives multiple reboots. (v1.0)
         */
        post: {
            parameters: {
                query?: {
                    /** @description Optional id of the keySet to use for the manifest. */
                    keySetId?: string;
                };
                header?: never;
                path: {
                    /** @description Id of the vm to start on the selected target. */
                    vmId: string;
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
                        "application/json": components["schemas"]["cef11873-6a5e-4b21-a4ae-dd029a36f6f4"];
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
    "/api/vms/{vmId}/update": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the specified vm after triggering an update on the vm so it contains the latest data. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the vm to return. */
                    vmId: string;
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
                        "application/json": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"];
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
    "/api/vms/{vmId}/details": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the detailed information about the specified vm. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the vm to return. */
                    vmId: string;
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
                        "application/json": components["schemas"]["84796ec3-0900-4a4f-9323-be9e160c6ad7"];
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
    "/api/vms/{vmId}/localRunProfile/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Set the local runProfileId for the specified vm. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the vm to update. */
                    vmId: string;
                    /** @description Id of the runProfile to use. */
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
                    content: {
                        "application/json": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"];
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
    "/api/vms/{vmId}/target/{targetId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Set the selected target of the specified vm. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the vm to set the target on. */
                    vmId: string;
                    /** @description Id of the target to use. */
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
                        "application/json": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"];
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
    "/api/vms/targets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all currently available targets. (v1.0) */
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
                        "application/json": components["schemas"]["c99f208e-2e20-4116-94a6-74a32ef37e6d"];
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
    "/api/vms/flow/node/visible": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return flow nodes that are visible to the ui. (v1.0) */
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
                        "application/json": components["schemas"]["b37c70d1-0105-40b9-9813-dbd0515ebb7f"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Clear the list of visible flow nodes. (v1.0) */
        delete: {
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
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/vms/flow/node/{nodeId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Load any unloaded vm's in the node, returning the loaded vm's and the vmId's for the node. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the flow node to return. */
                    nodeId: string;
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
                        "application/json": components["schemas"]["24f452d5-4dc5-44de-ac0c-ccf328e172f5"];
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
    "/api/vms/flow/node/{nodeId}/visible": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Indicate that the flow node is visible to the ui. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the flow node to mark visible. */
                    nodeId: string;
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
        /** Indicate that the flow node is no longer visible to the ui. (v1.0) */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the flow node to remove from visibility. */
                    nodeId: string;
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
        "ad2f0a48-6e5c-4397-ab70-3a7365ea7061": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"][];
        "01eba9db-a501-42d1-9449-d5a9403f426d": {
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmChainedSectionRefEntry>) */
            chainedSectionRefEntries?: components["schemas"]["384d3cc9-b5e4-43e8-a360-bc9f7624b9d4"];
            effectiveReleaseId?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmDevFlags) */
            localDevFlags?: components["schemas"]["e529caf9-ce63-44cd-928c-259d3c4c34b6"];
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmDevFlags) */
            effectiveParentLocalDevFlags?: components["schemas"]["e529caf9-ce63-44cd-928c-259d3c4c34b6"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmRelease>) */
            parentReleases?: components["schemas"]["266112c3-5763-4e67-91a8-5ee6d9bda058"];
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmRelease) */
            release?: components["schemas"]["03ea52d1-0d55-4e4c-8e2c-b207b584ceaa"];
            /** @description (typeName=java.util.Set<java.lang.String>) */
            virtualArtifactDeps?: components["schemas"]["55cb8fb1-459f-4f4b-a12b-399db7c4bd96"];
            ownerId?: string;
            type?: string;
            shareMode?: string;
            /** @description (typeName=com.kosdev.studio.app.squash.SquashConfig) */
            parentSquashConfig?: components["schemas"]["7d87985e-baed-4927-9e32-099ea2279eff"];
            /** @description (typeName=java.util.Collection<com.kosdev.studio.app.service.vm.beans.VmSection>) */
            parentSections?: components["schemas"]["78e41b37-82cd-4883-b54e-cd3c1d2ace40"];
            mutable?: boolean;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmLayer>) */
            layers?: components["schemas"]["47304b56-4374-4443-b7bd-013f7697284b"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmFragment>) */
            fragments?: components["schemas"]["af9daf41-40c4-42b5-8ff1-d903a83b6e3a"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmDevFlags>) */
            parentLocalDevFlags?: components["schemas"]["3458d8e5-0e1c-4a44-b76e-bc2e482f2220"];
            id?: string;
            locked?: boolean;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmDevFlags>) */
            parentDevFlags?: components["schemas"]["3458d8e5-0e1c-4a44-b76e-bc2e482f2220"];
            /** @description (typeName=java.util.Set<java.lang.String>) */
            repoDeps?: components["schemas"]["55cb8fb1-459f-4f4b-a12b-399db7c4bd96"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.dao.LocalPortMap>) */
            parentLocalPortMaps?: components["schemas"]["5da4ec63-9642-46bc-a397-da97ecddeb1d"];
            /** Format: int32 */
            collabType?: number;
            visible?: boolean;
            /** @description (typeName=java.util.Set<java.lang.String>) */
            marketArtifactDeps?: components["schemas"]["55cb8fb1-459f-4f4b-a12b-399db7c4bd96"];
            flowNodeId?: string;
            chainedManifestId?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmFavoriteSyncBean) */
            favoriteBean?: components["schemas"]["8bf4cd15-667c-4480-ae1c-ad35d2ea2efd"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmDeviceGrant>) */
            parentDeviceGrants?: components["schemas"]["01406280-4ee2-45d0-a460-b36b7c01b3ae"];
            version?: string;
            /** @description (typeName=java.util.Collection<com.kosdev.studio.app.service.vm.beans.VmSection>) */
            sections?: components["schemas"]["78e41b37-82cd-4883-b54e-cd3c1d2ace40"];
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.VmTagSyncBean>) */
            tags?: components["schemas"]["6c7889e4-7e42-413d-aa1c-eb583af61826"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmBuildScript>) */
            parentBuildScripts?: components["schemas"]["f2bb1c4c-304b-414c-b47c-5504f11d034a"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmFileArtifact>) */
            fileArtifacts?: components["schemas"]["be438a54-01f6-45c3-a4c3-3b9cb9cf8998"];
            parentReleaseId?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmFragment>) */
            parentFragments?: components["schemas"]["af9daf41-40c4-42b5-8ff1-d903a83b6e3a"];
            name?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmChainedSectionRef>) */
            chainedSectionRefs?: components["schemas"]["3c358365-d016-4504-914d-5755883bc7bd"];
            /** @description (typeName=java.util.Collection<com.kosdev.studio.commons.sync.data.VmSrcTreeSyncBean>) */
            parentSrcTrees?: components["schemas"]["faf470b8-4a87-4c39-9a28-29bafd1c4e72"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmChainedSectionRefEntry>) */
            parentChainedSectionRefEntries?: components["schemas"]["384d3cc9-b5e4-43e8-a360-bc9f7624b9d4"];
            favoriteTag?: boolean;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmBuildScript>) */
            buildScripts?: components["schemas"]["f2bb1c4c-304b-414c-b47c-5504f11d034a"];
            favorite?: boolean;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmError>) */
            errors?: components["schemas"]["ddca1eb0-6109-40e4-b52c-c3e511454bd0"];
            desc?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmDevFlags) */
            devFlags?: components["schemas"]["e529caf9-ce63-44cd-928c-259d3c4c34b6"];
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmDevFlags) */
            effectiveParentDevFlags?: components["schemas"]["e529caf9-ce63-44cd-928c-259d3c4c34b6"];
            parentSimProfileId?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.VmShareSyncBean>) */
            shares?: components["schemas"]["6491d800-f414-43f1-9947-694228f8681b"];
            /** @description (typeName=java.util.Set<java.lang.String>) */
            directoryDeps?: components["schemas"]["55cb8fb1-459f-4f4b-a12b-399db7c4bd96"];
            /** @description (typeName=java.util.Set<java.lang.String>) */
            artifactDeps?: components["schemas"]["55cb8fb1-459f-4f4b-a12b-399db7c4bd96"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmPortMap>) */
            parentPortMaps?: components["schemas"]["eda7b3db-e599-44c2-a800-bab9bfee3dbc"];
            releaseId?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmFileArtifact>) */
            parentFileArtifacts?: components["schemas"]["be438a54-01f6-45c3-a4c3-3b9cb9cf8998"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmDeviceGrant>) */
            deviceGrants?: components["schemas"]["01406280-4ee2-45d0-a460-b36b7c01b3ae"];
            flowId?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmPortMap>) */
            portMaps?: components["schemas"]["eda7b3db-e599-44c2-a800-bab9bfee3dbc"];
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmRelease) */
            parentRelease?: components["schemas"]["03ea52d1-0d55-4e4c-8e2c-b207b584ceaa"];
            /** Format: int32 */
            severity?: number;
            /** @description (typeName=java.util.Collection<com.kosdev.studio.commons.sync.data.VmSrcTreeSyncBean>) */
            srcTrees?: components["schemas"]["faf470b8-4a87-4c39-9a28-29bafd1c4e72"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmLayer>) */
            parentLayers?: components["schemas"]["47304b56-4374-4443-b7bd-013f7697284b"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.SimProfileSyncBean) */
            simProfile?: components["schemas"]["b67db59e-a82d-48ff-bcd5-2223da7fce65"];
            simProfileId?: string;
            parentId?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmChainedSectionRef>) */
            parentChainedSectionRefs?: components["schemas"]["3c358365-d016-4504-914d-5755883bc7bd"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmRelease>) */
            releases?: components["schemas"]["266112c3-5763-4e67-91a8-5ee6d9bda058"];
            /** @description (typeName=com.kosdev.studio.app.service.targets.Target) */
            target?: components["schemas"]["550b29a8-e98d-4145-a0c6-febc6c9b1e2d"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.dao.LocalPortMap>) */
            localPortMaps?: components["schemas"]["5da4ec63-9642-46bc-a397-da97ecddeb1d"];
            runnable?: boolean;
            fragment?: boolean;
            /** @description (typeName=com.kosdev.studio.app.squash.SquashConfig) */
            squashConfig?: components["schemas"]["7d87985e-baed-4927-9e32-099ea2279eff"];
            deleted?: boolean;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.SimProfileSyncBean) */
            parentSimProfile?: components["schemas"]["b67db59e-a82d-48ff-bcd5-2223da7fce65"];
            createdBy?: string;
            localRunProfileId?: string;
            fragmentId?: string;
            hasError?: boolean;
            effectiveSimProfileId?: string;
        };
        "384d3cc9-b5e4-43e8-a360-bc9f7624b9d4": components["schemas"]["123c1fd3-9a0a-4b8b-8dea-a6865de7a7fc"][];
        "123c1fd3-9a0a-4b8b-8dea-a6865de7a7fc": {
            excluded?: boolean;
            srcSection?: string;
            srcVmId?: string;
            disabled?: boolean;
            propertiesJson?: string;
            optional?: boolean;
            refId?: string;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["6f93151f-a7a0-48b5-8e8e-0e188907d07a"];
            dstSection?: string;
        };
        "6f93151f-a7a0-48b5-8e8e-0e188907d07a": {
            msg?: string;
            /** Format: int32 */
            severity?: number;
            data?: Record<string, never>;
        };
        "e529caf9-ce63-44cd-928c-259d3c4c34b6": {
            /** @description (typeName=java.util.Map<java.lang.String, java.lang.String>) */
            screenRotation?: components["schemas"]["236431fc-9be0-4fe3-8339-f2e536f71272"];
            screenBlank?: boolean;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmDevFlags$SambaConfig) */
            samba?: components["schemas"]["a4bbcffc-c2b0-4ea4-9275-d1a2fe62658c"];
            mouseCursor?: boolean;
        };
        "236431fc-9be0-4fe3-8339-f2e536f71272": string;
        "a4bbcffc-c2b0-4ea4-9275-d1a2fe62658c": {
            hostname?: string;
            password?: string;
            enabled?: boolean;
        };
        "266112c3-5763-4e67-91a8-5ee6d9bda058": components["schemas"]["03ea52d1-0d55-4e4c-8e2c-b207b584ceaa"][];
        "03ea52d1-0d55-4e4c-8e2c-b207b584ceaa": {
            excluded?: boolean;
            note?: string;
            releaseId?: string;
            vmId?: string;
            srcVmId?: string;
            name?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["6f93151f-a7a0-48b5-8e8e-0e188907d07a"];
            config?: string;
        };
        "55cb8fb1-459f-4f4b-a12b-399db7c4bd96": string[];
        "7d87985e-baed-4927-9e32-099ea2279eff": {
            /** @description (typeName=java.util.List<com.kosdev.studio.app.squash.line.SquashLine>) */
            lines?: components["schemas"]["4b4e6bdb-312c-4942-8912-1392a1f424b1"];
        };
        "4b4e6bdb-312c-4942-8912-1392a1f424b1": components["schemas"]["d8157a88-4f8a-4d2c-a524-31c4412e1c8c"][];
        "d8157a88-4f8a-4d2c-a524-31c4412e1c8c": {
            removed?: boolean;
            raw?: string;
            /** Format: int32 */
            id?: number;
            /** @description (typeName=com.kosdev.studio.app.squash.line.SquashLine$Error) */
            error?: components["schemas"]["3c0e9cc7-4b27-47ff-844a-e8f0c187ddb4"];
        };
        "3c0e9cc7-4b27-47ff-844a-e8f0c187ddb4": {
            msg?: string;
            /** Format: int32 */
            endIdx?: number;
            /** Format: int32 */
            startIdx?: number;
        };
        "78e41b37-82cd-4883-b54e-cd3c1d2ace40": components["schemas"]["b6a88d4b-74a8-4a79-b2af-f0b9058b927c"][];
        "b6a88d4b-74a8-4a79-b2af-f0b9058b927c": {
            excluded?: boolean;
            vmId?: string;
            srcVmId?: string;
            name?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["6f93151f-a7a0-48b5-8e8e-0e188907d07a"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmSectionItem>) */
            items?: components["schemas"]["973c7c13-e731-4a32-ad2b-cfd1c9252d9d"];
        };
        "973c7c13-e731-4a32-ad2b-cfd1c9252d9d": components["schemas"]["b2fe3c8b-4c76-4b3e-b3b8-df0e3c4a4332"][];
        "b2fe3c8b-4c76-4b3e-b3b8-df0e3c4a4332": {
            excluded?: boolean;
            vmId?: string;
            srcVmId?: string;
            disabled?: boolean;
            sectionId?: string;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["6f93151f-a7a0-48b5-8e8e-0e188907d07a"];
            type?: string;
            vmSrcId?: string;
        };
        "47304b56-4374-4443-b7bd-013f7697284b": components["schemas"]["ae2eae87-27c2-48ef-875f-3834c45ece9d"][];
        "ae2eae87-27c2-48ef-875f-3834c45ece9d": {
            excluded?: boolean;
            note?: string;
            srcVmId?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["6f93151f-a7a0-48b5-8e8e-0e188907d07a"];
            type?: string;
        };
        "af9daf41-40c4-42b5-8ff1-d903a83b6e3a": components["schemas"]["54fb5936-83aa-4806-9ce4-0158ecf0638e"][];
        "54fb5936-83aa-4806-9ce4-0158ecf0638e": {
            srcVmId?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["6f93151f-a7a0-48b5-8e8e-0e188907d07a"];
            version?: string;
            fragId?: string;
        };
        "3458d8e5-0e1c-4a44-b76e-bc2e482f2220": components["schemas"]["e529caf9-ce63-44cd-928c-259d3c4c34b6"][];
        "5da4ec63-9642-46bc-a397-da97ecddeb1d": components["schemas"]["d292be1d-f104-4bbc-a776-69b08cfaf377"][];
        "d292be1d-f104-4bbc-a776-69b08cfaf377": {
            /** Format: int32 */
            guestPort?: number;
            /** Format: int64 */
            createTime?: number;
            srcVmId?: string;
            /** Format: int32 */
            hostPort?: number;
            id?: string;
        };
        "8bf4cd15-667c-4480-ae1c-ad35d2ea2efd": {
            vmId?: string;
            id?: string;
            userId?: string;
        };
        "01406280-4ee2-45d0-a460-b36b7c01b3ae": components["schemas"]["6e5ab613-623d-44bb-bfaf-206f939cff0e"][];
        "6e5ab613-623d-44bb-bfaf-206f939cff0e": {
            excluded?: boolean;
            vmId?: string;
            /** Format: int64 */
            createTime?: number;
            srcVmId?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["6f93151f-a7a0-48b5-8e8e-0e188907d07a"];
        };
        "6c7889e4-7e42-413d-aa1c-eb583af61826": components["schemas"]["5f206c92-50cf-4b57-8d30-d057995cfc62"][];
        "5f206c92-50cf-4b57-8d30-d057995cfc62": {
            tagId?: string;
            vmId?: string;
            id?: string;
        };
        "f2bb1c4c-304b-414c-b47c-5504f11d034a": components["schemas"]["a6ac9cb6-f52d-4315-9fcb-67b2db6a1e72"][];
        "a6ac9cb6-f52d-4315-9fcb-67b2db6a1e72": {
            excluded?: boolean;
            /** @description (typeName=java.io.File) */
            file?: components["schemas"]["d6c09d6e-2407-42f0-a40d-665d69494424"];
            srcVmId?: string;
            name?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["6f93151f-a7a0-48b5-8e8e-0e188907d07a"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.DirectorySyncBean) */
            directory?: components["schemas"]["1e75c23a-00a2-48bc-adf8-281438c8b19e"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmBuildScriptSyncBean) */
            bean?: components["schemas"]["da628d48-27bf-44a4-938a-2d5e1d739c36"];
        };
        "d6c09d6e-2407-42f0-a40d-665d69494424": unknown;
        "1e75c23a-00a2-48bc-adf8-281438c8b19e": {
            createdBy?: string;
            name?: string;
            id?: string;
            desc?: string;
        };
        "da628d48-27bf-44a4-938a-2d5e1d739c36": unknown;
        "be438a54-01f6-45c3-a4c3-3b9cb9cf8998": components["schemas"]["53fb4a1b-3476-4a85-b099-5b2676af1e9d"][];
        "53fb4a1b-3476-4a85-b099-5b2676af1e9d": {
            srcVmId?: string;
            kabType?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["6f93151f-a7a0-48b5-8e8e-0e188907d07a"];
            type?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.DirectorySyncBean) */
            directory?: components["schemas"]["1e75c23a-00a2-48bc-adf8-281438c8b19e"];
            version?: string;
            layer?: boolean;
            excluded?: boolean;
            path?: string;
            /** @description (typeName=java.io.File) */
            file?: components["schemas"]["d6c09d6e-2407-42f0-a40d-665d69494424"];
            qualifier?: string;
            name?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmFileArtifactSyncBean) */
            bean?: components["schemas"]["d7c330d5-d20e-48af-944b-728044c1a1d4"];
        };
        "d7c330d5-d20e-48af-944b-728044c1a1d4": unknown;
        "3c358365-d016-4504-914d-5755883bc7bd": components["schemas"]["bc811bf0-1284-494c-a3c5-b26e3577fd65"][];
        "bc811bf0-1284-494c-a3c5-b26e3577fd65": {
            excluded?: boolean;
            srcVmId?: string;
            authority?: string;
            name?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["6f93151f-a7a0-48b5-8e8e-0e188907d07a"];
            desc?: string;
        };
        "faf470b8-4a87-4c39-9a28-29bafd1c4e72": components["schemas"]["7d731cce-f26a-49a0-a75a-45170fdbe94d"][];
        "7d731cce-f26a-49a0-a75a-45170fdbe94d": {
            srcTreeId?: string;
            vmId?: string;
            srcVmId?: string;
            id?: string;
        };
        "ddca1eb0-6109-40e4-b52c-c3e511454bd0": components["schemas"]["6f93151f-a7a0-48b5-8e8e-0e188907d07a"][];
        "6491d800-f414-43f1-9947-694228f8681b": components["schemas"]["8a0f0e69-fa72-41ad-ab6f-b36259c6c1c1"][];
        "8a0f0e69-fa72-41ad-ab6f-b36259c6c1c1": {
            vmId?: string;
            id?: string;
            userId?: string;
        };
        "eda7b3db-e599-44c2-a800-bab9bfee3dbc": components["schemas"]["d9ca3c3c-2a30-41fa-ac1d-33b3036f855c"][];
        "d9ca3c3c-2a30-41fa-ac1d-33b3036f855c": {
            excluded?: boolean;
            /** Format: int32 */
            guestPort?: number;
            vmId?: string;
            /** Format: int64 */
            createTime?: number;
            srcVmId?: string;
            disabled?: boolean;
            /** Format: int32 */
            hostPort?: number;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["6f93151f-a7a0-48b5-8e8e-0e188907d07a"];
        };
        "b67db59e-a82d-48ff-bcd5-2223da7fce65": {
            /** Format: int32 */
            diskSize?: number;
            /** Format: int32 */
            screenWidth?: number;
            /** Format: int32 */
            memorySize?: number;
            hidden?: boolean;
            createdBy?: string;
            /** Format: int32 */
            screenHeight?: number;
            name?: string;
            id?: string;
            locked?: boolean;
            projectId?: string;
            desc?: string;
        };
        "550b29a8-e98d-4145-a0c6-febc6c9b1e2d": {
            name?: string;
            id?: string;
            addr?: string;
            type?: string;
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
        "cef11873-6a5e-4b21-a4ae-dd029a36f6f4": {
            reason?: string;
            note?: string;
            /** @description (typeName=com.kosdev.kos.commons.util.ReasonData) */
            reasonData?: components["schemas"]["15676a30-551a-42b1-9e09-2181397594f0"];
            /** @description (typeName=com.kosdev.kos.commons.util.concurrent.future.FutureState) */
            endState?: components["schemas"]["439c5a68-3e8d-4f7b-a617-d35d5e4bbd70"];
            /** Format: int32 */
            abortAbandonedTimeoutMs?: number;
            /** @description (typeName=com.kosdev.kos.commons.util.concurrent.future.FutureWork) */
            rootFuture?: components["schemas"]["cef11873-6a5e-4b21-a4ae-dd029a36f6f4"];
            tracker?: string;
            /** Format: int64 */
            remainingTimeMs?: number;
            name?: string;
            /** Format: int32 */
            progress?: number;
            /** @description (typeName=java.util.Map<java.lang.String, com.kosdev.kos.commons.util.json.JsonViewWrapper>) */
            clientAttributes?: components["schemas"]["0399045e-fc87-4b7d-8cfc-aa2036a0827e"];
            /** Format: int32 */
            id?: number;
            /** @description (typeName=com.kosdev.kos.commons.util.json.JsonViewWrapper) */
            clientData?: components["schemas"]["df23cb99-a783-4668-a306-1239a2e4074e"];
        };
        "15676a30-551a-42b1-9e09-2181397594f0": {
            /** @description (typeName=java.lang.Class<?>) */
            view?: components["schemas"]["85ed52b3-600a-412f-902a-de9ebee20dc1"];
            data?: Record<string, never>;
        };
        "85ed52b3-600a-412f-902a-de9ebee20dc1": unknown;
        "439c5a68-3e8d-4f7b-a617-d35d5e4bbd70": {
            cancel?: boolean;
            fail?: boolean;
            abort?: boolean;
            success?: boolean;
            unsuccess?: boolean;
            /** @description (typeName=com.kosdev.kos.commons.util.concurrent.future.FutureEvent) */
            futureEvent?: components["schemas"]["76a0af67-5390-47cf-aa88-1eb98abc6799"];
            terminate?: boolean;
            done?: boolean;
        };
        "76a0af67-5390-47cf-aa88-1eb98abc6799": unknown;
        /** @description (typeName=com.kosdev.kos.commons.util.json.JsonViewWrapper) */
        "0399045e-fc87-4b7d-8cfc-aa2036a0827e": components["schemas"]["df23cb99-a783-4668-a306-1239a2e4074e"];
        "df23cb99-a783-4668-a306-1239a2e4074e": {
            /** @description (typeName=java.lang.Class<?>) */
            view?: components["schemas"]["85ed52b3-600a-412f-902a-de9ebee20dc1"];
            data?: Record<string, never>;
        };
        "ea92363d-4c5a-4fd9-bb1f-525408219a92": components["schemas"]["56e60fa6-ab41-4b64-8469-9d199e0919ee"][];
        "56e60fa6-ab41-4b64-8469-9d199e0919ee": {
            targetId?: string;
            vmId?: string;
            runProfileId?: string;
            /** @description (typeName=com.kosdev.studio.app.service.targets.Target) */
            target?: components["schemas"]["4794d75c-e8e8-491e-8ea1-1420a052e4c8"];
        };
        "4794d75c-e8e8-491e-8ea1-1420a052e4c8": {
            simulator?: boolean;
            name?: string;
            id?: string;
            addr?: string;
            type?: string;
        };
        "257859e8-dac8-4fd2-a30b-894926165ba7": components["schemas"]["7239ce4d-7607-4a56-9f9c-67f779b7e119"][];
        "7239ce4d-7607-4a56-9f9c-67f779b7e119": {
            /** @description (typeName=java.util.Map<com.kosdev.studio.app.service.vm.VmTarget, com.kosdev.studio.app.service.vm.VmTargetRunInfo>) */
            vmTargets?: components["schemas"]["ae54f253-c475-4829-9769-21758e6b452a"];
            id?: string;
        };
        /** @description (typeName=com.kosdev.studio.app.service.vm.VmTargetRunInfo) */
        "ae54f253-c475-4829-9769-21758e6b452a": components["schemas"]["5943cfc5-538b-4804-ab5b-4457e01ccb68"];
        "5943cfc5-538b-4804-ab5b-4457e01ccb68": {
            reason?: string;
            artifactVersion?: string;
            targetId?: string;
            /** @description (typeName=com.kosdev.kos.commons.util.ReasonData) */
            reasonData?: components["schemas"]["129ff289-fedc-466c-91fd-86ff62a2b13d"];
            /** Format: int32 */
            httpPort?: number;
            /** Format: int32 */
            nodeMgrPort?: number;
            /** @description (typeName=com.kosdev.studio.app.service.targets.Target) */
            target?: components["schemas"]["550b29a8-e98d-4145-a0c6-febc6c9b1e2d"];
            running?: boolean;
            /** Format: int64 */
            artifactTotal?: number;
            /** Format: int32 */
            stdoutPort?: number;
            artifactName?: string;
            /** Format: int32 */
            debugPort?: number;
            step?: string;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.VmTarget) */
            vmTarget?: components["schemas"]["9240edfc-46b5-4c07-91bc-01c9688abb83"];
            /** @description (typeName=com.kosdev.kos.commons.core.service.nodeMgr.ManifestInstallMode) */
            installMode?: components["schemas"]["1e834aa4-96dd-4632-b16d-d4e07f530df7"];
            /** Format: int64 */
            artifactCurrent?: number;
            primary?: boolean;
        };
        "129ff289-fedc-466c-91fd-86ff62a2b13d": unknown;
        "9240edfc-46b5-4c07-91bc-01c9688abb83": {
            targetId?: string;
            vmId?: string;
            runProfileId?: string;
            /** @description (typeName=com.kosdev.studio.app.service.targets.Target) */
            target?: components["schemas"]["550b29a8-e98d-4145-a0c6-febc6c9b1e2d"];
        };
        "1e834aa4-96dd-4632-b16d-d4e07f530df7": unknown;
        "62c41294-d54e-4c0a-8689-b0e7795850e4": {
            /** @description (typeName=java.util.Map<java.lang.String, java.lang.String>) */
            screenRotation?: components["schemas"]["48cc7303-ec37-49bc-9f7b-e069da5dffcf"];
            screenBlank?: boolean;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmDevFlags$SambaConfig) */
            samba?: components["schemas"]["ae005cf3-c20c-4c3d-922f-5d6294180d89"];
            mouseCursor?: boolean;
        };
        "48cc7303-ec37-49bc-9f7b-e069da5dffcf": string;
        "ae005cf3-c20c-4c3d-922f-5d6294180d89": {
            hostname?: string;
            password?: string;
            enabled?: boolean;
        };
        "b3f65623-6070-4823-9ad3-2444d1c40f69": {
            /** Format: int32 */
            guestPort?: number;
            /** Format: int64 */
            createTime?: number;
            srcVmId?: string;
            /** Format: int32 */
            hostPort?: number;
            id?: string;
        };
        "84796ec3-0900-4a4f-9323-be9e160c6ad7": {
            effectiveReleaseId?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmChainedSectionRefEntry>) */
            chainedSectionRefEntries?: components["schemas"]["bc4c5274-afc3-48b0-bb15-b7eb155b0bea"];
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmDevFlags) */
            effectiveParentLocalDevFlags?: components["schemas"]["62c41294-d54e-4c0a-8689-b0e7795850e4"];
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmDevFlags) */
            localDevFlags?: components["schemas"]["62c41294-d54e-4c0a-8689-b0e7795850e4"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmRelease>) */
            parentReleases?: components["schemas"]["8edef35d-c9cf-49f8-b5d3-48c72300fe40"];
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmRelease) */
            release?: components["schemas"]["70893ba4-f367-4e0c-ae24-e318b5406e1f"];
            /** @description (typeName=java.util.Set<java.lang.String>) */
            virtualArtifactDeps?: components["schemas"]["73fd5553-b7e8-4a00-b34a-b44241d0f77d"];
            groupId?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.NodeInstanceSyncBean) */
            effectiveNodeInst?: components["schemas"]["8366b3a0-9aed-4bd6-ae06-46bda1267bcc"];
            ownerId?: string;
            type?: string;
            /** @description (typeName=java.util.Set<java.lang.String>) */
            mixIns?: components["schemas"]["73fd5553-b7e8-4a00-b34a-b44241d0f77d"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.NodeTypeSyncBean) */
            effectiveNodeType?: components["schemas"]["f37befac-4764-4bd4-82c5-642f78b787af"];
            shareMode?: string;
            /** @description (typeName=com.kosdev.studio.app.squash.SquashConfig) */
            parentSquashConfig?: components["schemas"]["aa5eb1be-5c86-4456-9dfa-4ff25e3ed2e4"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.SimProfileSyncBean) */
            effectiveSimProfile?: components["schemas"]["77dbd709-8f57-43cf-9cf1-5f34bd837820"];
            /** @description (typeName=java.util.Collection<com.kosdev.studio.app.service.vm.beans.VmSection>) */
            parentSections?: components["schemas"]["24e371c1-a658-47a0-9727-ebf70a14aa92"];
            mutable?: boolean;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmLayer>) */
            layers?: components["schemas"]["1600f6cc-b761-4aea-b024-9501d8854710"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmFragment>) */
            fragments?: components["schemas"]["45fb4a5b-3ad5-4029-a19b-7d4db2f83fa4"];
            id?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmDevFlags>) */
            parentLocalDevFlags?: components["schemas"]["ee277f9b-ebc4-495a-8562-9e9fa89cf20d"];
            locked?: boolean;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmDevFlags>) */
            parentDevFlags?: components["schemas"]["ee277f9b-ebc4-495a-8562-9e9fa89cf20d"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VirtualMachineSyncBean) */
            virtualMachine?: components["schemas"]["6f5591c3-576a-4006-81be-5f75f0b5cf12"];
            /** @description (typeName=java.util.Set<java.lang.String>) */
            repoDeps?: components["schemas"]["73fd5553-b7e8-4a00-b34a-b44241d0f77d"];
            /** Format: int32 */
            collabType?: number;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.dao.LocalPortMap>) */
            parentLocalPortMaps?: components["schemas"]["b4de2026-8e32-44e9-b2c4-a10ad5caf23d"];
            /** @description (typeName=com.kosdev.studio.app.service.targets.TargetInfo) */
            targetInfo?: components["schemas"]["3e3720f4-d4a4-4af5-b3e7-396092c6c635"];
            visible?: boolean;
            /** @description (typeName=java.util.Set<java.lang.String>) */
            marketArtifactDeps?: components["schemas"]["73fd5553-b7e8-4a00-b34a-b44241d0f77d"];
            flowNodeId?: string;
            chainedManifestId?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmFavoriteSyncBean) */
            favoriteBean?: components["schemas"]["a3e9869e-a339-4800-ab33-b0a3f2d6ec90"];
            collabProduction?: boolean;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmDeviceGrant>) */
            parentDeviceGrants?: components["schemas"]["9fb173a6-e82b-4e09-a678-a807ccb3f2be"];
            version?: string;
            /** @description (typeName=java.util.Collection<com.kosdev.studio.app.service.vm.beans.VmSection>) */
            sections?: components["schemas"]["24e371c1-a658-47a0-9727-ebf70a14aa92"];
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.VmTagSyncBean>) */
            tags?: components["schemas"]["7b8352b4-20a1-485a-98c2-4b3231cb5e79"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmBuildScript>) */
            parentBuildScripts?: components["schemas"]["be150803-0b3e-4d60-b6d8-05a3c4635ef2"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmFileArtifact>) */
            fileArtifacts?: components["schemas"]["01424b59-7e9c-484f-81c3-9deda559ee51"];
            parentReleaseId?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmFragment>) */
            parentFragments?: components["schemas"]["45fb4a5b-3ad5-4029-a19b-7d4db2f83fa4"];
            name?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmChainedSectionRef>) */
            chainedSectionRefs?: components["schemas"]["8b99452a-7bb9-44a8-b6d2-75fa6b86bc6c"];
            /** @description (typeName=java.util.Collection<com.kosdev.studio.commons.sync.data.VmSrcTreeSyncBean>) */
            parentSrcTrees?: components["schemas"]["bf1e4840-24f5-473c-86df-ea65d6789c28"];
            favoriteTag?: boolean;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmChainedSectionRefEntry>) */
            parentChainedSectionRefEntries?: components["schemas"]["bc4c5274-afc3-48b0-bb15-b7eb155b0bea"];
            favorite?: boolean;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmBuildScript>) */
            buildScripts?: components["schemas"]["be150803-0b3e-4d60-b6d8-05a3c4635ef2"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmError>) */
            errors?: components["schemas"]["8430b6a6-7d2e-4092-a313-faf77d859ec7"];
            desc?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmDevFlags) */
            devFlags?: components["schemas"]["62c41294-d54e-4c0a-8689-b0e7795850e4"];
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmDevFlags) */
            effectiveParentDevFlags?: components["schemas"]["62c41294-d54e-4c0a-8689-b0e7795850e4"];
            parentSimProfileId?: string;
            collabIndividual?: boolean;
            collabTeam?: boolean;
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.VmShareSyncBean>) */
            shares?: components["schemas"]["e4c91e36-a633-468b-83ce-c34229ae8df1"];
            /** @description (typeName=java.util.Set<java.lang.String>) */
            directoryDeps?: components["schemas"]["73fd5553-b7e8-4a00-b34a-b44241d0f77d"];
            /** @description (typeName=java.util.Set<java.lang.String>) */
            artifactDeps?: components["schemas"]["73fd5553-b7e8-4a00-b34a-b44241d0f77d"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmPortMap>) */
            parentPortMaps?: components["schemas"]["bf62999b-02f3-40a7-bd59-794108913c8c"];
            releaseId?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmFileArtifact>) */
            parentFileArtifacts?: components["schemas"]["01424b59-7e9c-484f-81c3-9deda559ee51"];
            flowId?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmDeviceGrant>) */
            deviceGrants?: components["schemas"]["9fb173a6-e82b-4e09-a678-a807ccb3f2be"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmPortMap>) */
            portMaps?: components["schemas"]["bf62999b-02f3-40a7-bd59-794108913c8c"];
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmRelease) */
            parentRelease?: components["schemas"]["70893ba4-f367-4e0c-ae24-e318b5406e1f"];
            /** Format: int32 */
            severity?: number;
            /** @description (typeName=java.util.Collection<com.kosdev.studio.commons.sync.data.VmSrcTreeSyncBean>) */
            srcTrees?: components["schemas"]["bf1e4840-24f5-473c-86df-ea65d6789c28"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.SimProfileSyncBean) */
            simProfile?: components["schemas"]["77dbd709-8f57-43cf-9cf1-5f34bd837820"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmLayer>) */
            parentLayers?: components["schemas"]["1600f6cc-b761-4aea-b024-9501d8854710"];
            simProfileId?: string;
            parentId?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmChainedSectionRef>) */
            parentChainedSectionRefs?: components["schemas"]["8b99452a-7bb9-44a8-b6d2-75fa6b86bc6c"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmRelease>) */
            releases?: components["schemas"]["8edef35d-c9cf-49f8-b5d3-48c72300fe40"];
            /** @description (typeName=com.kosdev.studio.app.service.targets.Target) */
            target?: components["schemas"]["4794d75c-e8e8-491e-8ea1-1420a052e4c8"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.dao.LocalPortMap>) */
            localPortMaps?: components["schemas"]["b4de2026-8e32-44e9-b2c4-a10ad5caf23d"];
            runnable?: boolean;
            fragment?: boolean;
            deleted?: boolean;
            /** @description (typeName=com.kosdev.studio.app.squash.SquashConfig) */
            squashConfig?: components["schemas"]["aa5eb1be-5c86-4456-9dfa-4ff25e3ed2e4"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.SimProfileSyncBean) */
            parentSimProfile?: components["schemas"]["77dbd709-8f57-43cf-9cf1-5f34bd837820"];
            createdBy?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmRelease) */
            effectiveRelease?: components["schemas"]["70893ba4-f367-4e0c-ae24-e318b5406e1f"];
            localRunProfileId?: string;
            fragmentId?: string;
            hasError?: boolean;
            effectiveSimProfileId?: string;
        };
        "bc4c5274-afc3-48b0-bb15-b7eb155b0bea": components["schemas"]["737aefd3-c804-4081-8f6c-d9bbd2a5d672"][];
        "737aefd3-c804-4081-8f6c-d9bbd2a5d672": {
            excluded?: boolean;
            mixIn?: boolean;
            srcSection?: string;
            srcVmId?: string;
            disabled?: boolean;
            propertiesJson?: string;
            optional?: boolean;
            refId?: string;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["edd004f7-c0e9-4f81-8a18-c9667819875f"];
            dstSection?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmChainedSectionRefEntrySyncBean) */
            bean?: components["schemas"]["95d2e928-19da-403f-b405-1304fe413af8"];
        };
        "edd004f7-c0e9-4f81-8a18-c9667819875f": {
            msg?: string;
            /** Format: int32 */
            severity?: number;
            data?: Record<string, never>;
        };
        "95d2e928-19da-403f-b405-1304fe413af8": {
            vmId?: string;
            opType?: string;
            propertiesJson?: string;
            optional?: boolean;
            chainedSectionRefId?: string;
            error?: string;
            orgId?: string;
            srcSection?: string;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            v?: number;
            refId?: string;
            id?: string;
            dstSection?: string;
        };
        "8edef35d-c9cf-49f8-b5d3-48c72300fe40": components["schemas"]["70893ba4-f367-4e0c-ae24-e318b5406e1f"][];
        "70893ba4-f367-4e0c-ae24-e318b5406e1f": {
            note?: string;
            vmId?: string;
            srcVmId?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.KosReleaseSyncBean) */
            release?: components["schemas"]["36981284-7561-497f-a6a8-b9273fa53c32"];
            /** @description (typeName=com.kosdev.studio.commons.beans.release.ReleaseDescriptor) */
            descriptor?: components["schemas"]["f0b9acc9-7ea3-4843-b3cb-17634d4298ad"];
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["edd004f7-c0e9-4f81-8a18-c9667819875f"];
            excluded?: boolean;
            mixIn?: boolean;
            releaseId?: string;
            /** @description (typeName=java.util.Map<com.kosdev.studio.commons.beans.release.ReleaseArtifact, com.kosdev.studio.commons.resolver.ResolvedArtifact>) */
            resolvedArtifacts?: components["schemas"]["44bc29ba-3b28-4e45-814b-aad356b8053f"];
            name?: string;
            disabled?: boolean;
            id?: string;
            config?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmReleaseSyncBean) */
            bean?: components["schemas"]["6cb559f1-535f-4761-aa5c-e8ca206fe73b"];
            /** @description (typeName=java.util.Map<com.kosdev.studio.commons.beans.release.ReleaseArtifact, com.kosdev.studio.commons.resolver.ResolvedArtifact>) */
            artifacts?: components["schemas"]["44bc29ba-3b28-4e45-814b-aad356b8053f"];
        };
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
        "f0b9acc9-7ea3-4843-b3cb-17634d4298ad": {
            /** @description (typeName=com.fasterxml.jackson.databind.JsonNode) */
            components?: components["schemas"]["e4261594-650f-47b7-a745-864385f450d0"];
            /** @description (typeName=com.fasterxml.jackson.databind.JsonNode) */
            options?: components["schemas"]["e4261594-650f-47b7-a745-864385f450d0"];
            version?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.beans.release.ReleaseArtifact>) */
            artifacts?: components["schemas"]["ca6edb57-3f8b-4dd0-9ad6-1efa34f6ead4"];
        };
        "ca6edb57-3f8b-4dd0-9ad6-1efa34f6ead4": components["schemas"]["aff30bcb-062b-4453-8288-ffdd565af59f"][];
        "aff30bcb-062b-4453-8288-ffdd565af59f": {
            market?: boolean;
            /** @description (typeName=java.util.List<java.lang.String>) */
            optionKeys?: components["schemas"]["8e9aae11-4174-4f14-b9e1-55e14fbbf358"];
            name?: string;
            section?: string;
            selector?: string;
            version?: string;
        };
        "8e9aae11-4174-4f14-b9e1-55e14fbbf358": string[];
        /** @description (typeName=com.kosdev.studio.commons.resolver.ResolvedArtifact) */
        "44bc29ba-3b28-4e45-814b-aad356b8053f": components["schemas"]["76bea312-6cd6-4206-ad28-75e732536500"];
        "76bea312-6cd6-4206-ad28-75e732536500": {
            repoId?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.ArtifactInstanceSyncBean>) */
            potentials?: components["schemas"]["728882f0-7ae1-45cc-9792-d83f8a24b04d"];
            repoJson?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.ArtifactInstanceSyncBean) */
            instance?: components["schemas"]["b9c578bd-d9c5-4884-8975-59eb15d0a4a4"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.ArtifactRepoSyncBean) */
            repo?: components["schemas"]["8e912d21-ab8a-438f-a54e-e8e1cde1910c"];
            miniHash?: string;
            repoLocation?: string;
            kabType?: string;
            version?: string;
            local?: boolean;
            kabIdentifier?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.ArtifactSyncBean) */
            artifact?: components["schemas"]["1a159325-9581-4a5c-aa2a-efc89f37d99e"];
            valid?: boolean;
            repoType?: string;
            /** Format: int64 */
            size?: number;
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.ArtifactInstanceSyncBean>) */
            exacts?: components["schemas"]["728882f0-7ae1-45cc-9792-d83f8a24b04d"];
            name?: string;
            /** @description (typeName=com.kosdev.studio.commons.orgmodel.repo.RepoInfo<?>) */
            repoInfo?: components["schemas"]["a2d938d9-09ca-4bce-b6ab-c761d8ade603"];
            /** @description (typeName=java.util.List<java.lang.String>) */
            selector?: components["schemas"]["8e9aae11-4174-4f14-b9e1-55e14fbbf358"];
            hash?: string;
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
        "a2d938d9-09ca-4bce-b6ab-c761d8ade603": {
            privateInfoAvailable?: boolean;
            id?: string;
            type?: string;
            /** @description (typeName=T) */
            privateInfo?: components["schemas"]["1c6c740d-d053-49f1-b6ea-61ce545c2555"];
        };
        "1c6c740d-d053-49f1-b6ea-61ce545c2555": unknown;
        "6cb559f1-535f-4761-aa5c-e8ca206fe73b": {
            note?: string;
            /** Format: int64 */
            createTime?: number;
            vmId?: string;
            releaseId?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            name?: string;
            refId?: string;
            id?: string;
            error?: string;
            config?: string;
            orgId?: string;
        };
        "73fd5553-b7e8-4a00-b34a-b44241d0f77d": string[];
        "8366b3a0-9aed-4bd6-ae06-46bda1267bcc": {
            deviceInstanceId?: string;
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
            devFlagsJson?: string;
            nodeTypeId?: string;
            orgId?: string;
        };
        "f37befac-4764-4bd4-82c5-642f78b787af": {
            primaryNode?: boolean;
            boardType?: string;
            kosProperties?: string;
            opType?: string;
            manifestPropertiesJson?: string;
            error?: string;
            /** Format: int32 */
            maxNodes?: number;
            type?: string;
            deviceId?: string;
            kernelParamsJson?: string;
            orgId?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            somType?: string;
            /** Format: int32 */
            v?: number;
            refId?: string;
            arch?: string;
            id?: string;
            desc?: string;
        };
        "aa5eb1be-5c86-4456-9dfa-4ff25e3ed2e4": {
            /** @description (typeName=java.util.List<com.kosdev.studio.app.squash.line.SquashLine>) */
            lines?: components["schemas"]["026ed9ed-de42-4698-b7c5-328428ea48a4"];
        };
        "026ed9ed-de42-4698-b7c5-328428ea48a4": components["schemas"]["e72525bd-a3bb-4bfb-886d-a110825ab4d2"][];
        "e72525bd-a3bb-4bfb-886d-a110825ab4d2": {
            removed?: boolean;
            raw?: string;
            /** Format: int32 */
            id?: number;
            /** @description (typeName=com.kosdev.studio.app.squash.line.SquashLine$Error) */
            error?: components["schemas"]["3ebb800c-63e0-4479-813a-c813855bbefa"];
        };
        "3ebb800c-63e0-4479-813a-c813855bbefa": {
            msg?: string;
            /** Format: int32 */
            endIdx?: number;
            /** Format: int32 */
            startIdx?: number;
        };
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
        "24e371c1-a658-47a0-9727-ebf70a14aa92": components["schemas"]["ca79a090-027c-4713-84c4-c9a58b26696d"][];
        "ca79a090-027c-4713-84c4-c9a58b26696d": {
            excluded?: boolean;
            mixIn?: boolean;
            vmId?: string;
            srcVmId?: string;
            name?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["edd004f7-c0e9-4f81-8a18-c9667819875f"];
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.vm.beans.VmSectionItem>) */
            items?: components["schemas"]["a203482f-012c-4319-8d91-741693e5c1e5"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmSectionSyncBean) */
            bean?: components["schemas"]["e2e7dec9-9a49-44f5-bda8-b0fae17ba2b8"];
        };
        "a203482f-012c-4319-8d91-741693e5c1e5": components["schemas"]["4e06bfe2-3109-4a28-a7b4-5988711de572"][];
        "4e06bfe2-3109-4a28-a7b4-5988711de572": {
            excluded?: boolean;
            mixIn?: boolean;
            vmId?: string;
            srcVmId?: string;
            disabled?: boolean;
            sectionId?: string;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["edd004f7-c0e9-4f81-8a18-c9667819875f"];
            type?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmSectionItemSyncBean) */
            bean?: components["schemas"]["4f064ba8-3fcb-4074-ade3-1206ebfe54d9"];
            vmSrcId?: string;
        };
        "4f064ba8-3fcb-4074-ade3-1206ebfe54d9": {
            note?: string;
            srcTreeId?: string;
            vmId?: string;
            opType?: string;
            sectionId?: string;
            error?: string;
            type?: string;
            version?: string;
            orgId?: string;
            marketArtifactId?: string;
            srcTreeArtifactName?: string;
            virtualArtifactId?: string;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            v?: number;
            selector?: string;
            artifactId?: string;
            refId?: string;
            fileArtifactId?: string;
            id?: string;
        };
        "e2e7dec9-9a49-44f5-bda8-b0fae17ba2b8": {
            /** Format: int64 */
            createTime?: number;
            vmId?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            name?: string;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
        };
        "1600f6cc-b761-4aea-b024-9501d8854710": components["schemas"]["bf956290-99a6-4f42-8439-df9c4c1047c5"][];
        "bf956290-99a6-4f42-8439-df9c4c1047c5": {
            excluded?: boolean;
            mixIn?: boolean;
            note?: string;
            srcVmId?: string;
            disabled?: boolean;
            artifactId?: string;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["edd004f7-c0e9-4f81-8a18-c9667819875f"];
            type?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmLayerSyncBean) */
            bean?: components["schemas"]["41f8787c-2e63-487a-9ce6-de0bf6cbd80f"];
            marketArtifactId?: string;
        };
        "41f8787c-2e63-487a-9ce6-de0bf6cbd80f": {
            note?: string;
            srcTreeId?: string;
            vmId?: string;
            opType?: string;
            error?: string;
            type?: string;
            version?: string;
            orgId?: string;
            marketArtifactId?: string;
            srcTreeArtifactName?: string;
            virtualArtifactId?: string;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            v?: number;
            /** Format: int32 */
            rank?: number;
            selector?: string;
            artifactId?: string;
            refId?: string;
            fileArtifactId?: string;
            id?: string;
        };
        "45fb4a5b-3ad5-4029-a19b-7d4db2f83fa4": components["schemas"]["4577746d-d1d0-433c-ad4f-1bcb47b25ce6"][];
        "4577746d-d1d0-433c-ad4f-1bcb47b25ce6": {
            mixIn?: boolean;
            vmId?: string;
            srcVmId?: string;
            loadable?: boolean;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["edd004f7-c0e9-4f81-8a18-c9667819875f"];
            version?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmFragSyncBean) */
            bean?: components["schemas"]["1601829d-f7dd-410f-9e6b-42639110e1eb"];
            fragId?: string;
        };
        "1601829d-f7dd-410f-9e6b-42639110e1eb": {
            /** Format: int64 */
            createTime?: number;
            vmId?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            refId?: string;
            id?: string;
            error?: string;
            version?: string;
            orgId?: string;
            fragId?: string;
        };
        "ee277f9b-ebc4-495a-8562-9e9fa89cf20d": components["schemas"]["62c41294-d54e-4c0a-8689-b0e7795850e4"][];
        "6f5591c3-576a-4006-81be-5f75f0b5cf12": {
            kosReleaseId?: string;
            opType?: string;
            error?: string;
            ownerId?: string;
            type?: string;
            orgId?: string;
            shareMode?: string;
            selector?: string;
            id?: string;
            devFlagsJson?: string;
            locked?: boolean;
            flowId?: string;
            /** Format: int32 */
            collabType?: number;
            flowNodeId?: string;
            chainedManifestId?: string;
            simProfileId?: string;
            version?: string;
            parentId?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            fragmentId?: string;
            name?: string;
            refId?: string;
            projectId?: string;
            squashInfo?: string;
            desc?: string;
        };
        "b4de2026-8e32-44e9-b2c4-a10ad5caf23d": components["schemas"]["b3f65623-6070-4823-9ad3-2444d1c40f69"][];
        "3e3720f4-d4a4-4af5-b3e7-396092c6c635": {
            nodeName?: string;
            mfgAuthority?: string;
            /** Format: int32 */
            nodeNameLock?: number;
            /** @description (typeName=java.util.List<java.lang.String>) */
            bootQueues?: components["schemas"]["8e9aae11-4174-4f14-b9e1-55e14fbbf358"];
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
        "a3e9869e-a339-4800-ab33-b0a3f2d6ec90": {
            /** Format: int64 */
            createTime?: number;
            vmId?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            refId?: string;
            id?: string;
            error?: string;
            userId?: string;
            orgId?: string;
        };
        "9fb173a6-e82b-4e09-a678-a807ccb3f2be": components["schemas"]["f48a11e5-2019-4021-b140-8d1e5c2b7925"][];
        "f48a11e5-2019-4021-b140-8d1e5c2b7925": {
            excluded?: boolean;
            mixIn?: boolean;
            /** @description (typeName=com.kosdev.studio.commons.orgmodel.repo.ResolvedInstance) */
            resolvedInstance?: components["schemas"]["1464ff7c-9ce9-46d5-82c9-c5bfbafd72e3"];
            /** @description (typeName=com.kosdev.studio.commons.resolver.ResolvedDeviceGrant) */
            rdg?: components["schemas"]["76da7da3-8e33-4137-83cc-daf47b44c8be"];
            vmId?: string;
            /** Format: int64 */
            createTime?: number;
            srcVmId?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["edd004f7-c0e9-4f81-8a18-c9667819875f"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmDeviceGrantSyncBean) */
            bean?: components["schemas"]["cb3d5791-327f-4909-accb-db7f41e9663c"];
        };
        "1464ff7c-9ce9-46d5-82c9-c5bfbafd72e3": {
            repoId?: string;
            repoType?: string;
            repoJson?: string;
            /** Format: int64 */
            size?: number;
            miniHash?: string;
            name?: string;
            repoLocation?: string;
            kabType?: string;
            version?: string;
            local?: boolean;
            hash?: string;
            kabIdentifier?: string;
        };
        "76da7da3-8e33-4137-83cc-daf47b44c8be": {
            repoId?: string;
            repoJson?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.ArtifactRepoSyncBean) */
            repo?: components["schemas"]["8e912d21-ab8a-438f-a54e-e8e1cde1910c"];
            miniHash?: string;
            repoLocation?: string;
            kabType?: string;
            version?: string;
            local?: boolean;
            kabIdentifier?: string;
            repoType?: string;
            /** Format: int64 */
            size?: number;
            name?: string;
            /** @description (typeName=com.kosdev.studio.commons.orgmodel.repo.RepoInfo<?>) */
            repoInfo?: components["schemas"]["a2d938d9-09ca-4bce-b6ab-c761d8ade603"];
            hash?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.DeviceGrantSyncBean) */
            bean?: components["schemas"]["73226361-a8a8-4e6e-93cf-107fabbcc995"];
        };
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
        "cb3d5791-327f-4909-accb-db7f41e9663c": {
            /** Format: int64 */
            createTime?: number;
            vmId?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            deviceGrantId?: string;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
        };
        "7b8352b4-20a1-485a-98c2-4b3231cb5e79": components["schemas"]["52f501fe-f169-4f28-8e11-1698a7cbeff1"][];
        "52f501fe-f169-4f28-8e11-1698a7cbeff1": {
            /** Format: int64 */
            createTime?: number;
            tagId?: string;
            vmId?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
        };
        "be150803-0b3e-4d60-b6d8-05a3c4635ef2": components["schemas"]["9f6c7edd-a146-42ae-bd43-931168e6eacd"][];
        "9f6c7edd-a146-42ae-bd43-931168e6eacd": {
            excluded?: boolean;
            mixIn?: boolean;
            /** @description (typeName=java.io.File) */
            file?: components["schemas"]["f57b5262-d158-4ce2-9515-d51e0c749ff4"];
            srcVmId?: string;
            name?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["edd004f7-c0e9-4f81-8a18-c9667819875f"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.DirectorySyncBean) */
            directory?: components["schemas"]["d8a022a4-c5c1-4e63-b08e-d828aa4fcfb5"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmBuildScriptSyncBean) */
            bean?: components["schemas"]["d4050823-2999-45ba-9a2a-f06e133793bf"];
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
        "d4050823-2999-45ba-9a2a-f06e133793bf": {
            vmId?: string;
            opType?: string;
            error?: string;
            type?: string;
            orgId?: string;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            v?: number;
            localPath?: string;
            name?: string;
            dirId?: string;
            dirPath?: string;
            refId?: string;
            id?: string;
        };
        "01424b59-7e9c-484f-81c3-9deda559ee51": components["schemas"]["5dce1adc-cd2f-4d09-b308-db3bff1975cd"][];
        "5dce1adc-cd2f-4d09-b308-db3bff1975cd": {
            srcVmId?: string;
            kabType?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["edd004f7-c0e9-4f81-8a18-c9667819875f"];
            type?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.DirectorySyncBean) */
            directory?: components["schemas"]["d8a022a4-c5c1-4e63-b08e-d828aa4fcfb5"];
            version?: string;
            layer?: boolean;
            excluded?: boolean;
            mixIn?: boolean;
            path?: string;
            /** @description (typeName=java.io.File) */
            file?: components["schemas"]["f57b5262-d158-4ce2-9515-d51e0c749ff4"];
            qualifier?: string;
            name?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmFileArtifactSyncBean) */
            bean?: components["schemas"]["57830c9c-6087-4183-8886-a0b512c22be8"];
        };
        "57830c9c-6087-4183-8886-a0b512c22be8": {
            vmId?: string;
            opType?: string;
            error?: string;
            type?: string;
            orgId?: string;
            /** Format: int64 */
            createTime?: number;
            /** Format: int32 */
            v?: number;
            qualifier?: string;
            localPath?: string;
            dirId?: string;
            dirPath?: string;
            refId?: string;
            id?: string;
        };
        "8b99452a-7bb9-44a8-b6d2-75fa6b86bc6c": components["schemas"]["6f485f70-0e54-4f93-af2f-3d033266fcee"][];
        "6f485f70-0e54-4f93-af2f-3d033266fcee": {
            excluded?: boolean;
            mixIn?: boolean;
            srcVmId?: string;
            authority?: string;
            name?: string;
            disabled?: boolean;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["edd004f7-c0e9-4f81-8a18-c9667819875f"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmChainedSectionRefSyncBean) */
            bean?: components["schemas"]["b9f203ca-d783-4b38-8d9c-8c40b05f4175"];
            desc?: string;
        };
        "b9f203ca-d783-4b38-8d9c-8c40b05f4175": {
            /** Format: int64 */
            createTime?: number;
            vmId?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            authority?: string;
            name?: string;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
            desc?: string;
        };
        "bf1e4840-24f5-473c-86df-ea65d6789c28": components["schemas"]["902d7711-c33c-471a-aeb8-441537cbd94a"][];
        "902d7711-c33c-471a-aeb8-441537cbd94a": {
            srcTreeId?: string;
            /** Format: int64 */
            createTime?: number;
            vmId?: string;
            /** Format: int32 */
            v?: number;
            srcVmId?: string;
            opType?: string;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
        };
        "8430b6a6-7d2e-4092-a313-faf77d859ec7": components["schemas"]["edd004f7-c0e9-4f81-8a18-c9667819875f"][];
        "e4c91e36-a633-468b-83ce-c34229ae8df1": components["schemas"]["5cdff5b9-9d30-40a4-8caa-045c13c63573"][];
        "5cdff5b9-9d30-40a4-8caa-045c13c63573": {
            /** Format: int64 */
            createTime?: number;
            vmId?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            refId?: string;
            id?: string;
            error?: string;
            userId?: string;
            orgId?: string;
        };
        "bf62999b-02f3-40a7-bd59-794108913c8c": components["schemas"]["e388cc9e-088c-439e-9148-6d2fdd545307"][];
        "e388cc9e-088c-439e-9148-6d2fdd545307": {
            excluded?: boolean;
            mixIn?: boolean;
            /** Format: int32 */
            guestPort?: number;
            vmId?: string;
            /** Format: int64 */
            createTime?: number;
            srcVmId?: string;
            disabled?: boolean;
            /** Format: int32 */
            hostPort?: number;
            id?: string;
            /** @description (typeName=com.kosdev.studio.app.service.vm.beans.VmError) */
            error?: components["schemas"]["edd004f7-c0e9-4f81-8a18-c9667819875f"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.VmPortMapSyncBean) */
            bean?: components["schemas"]["cbffdbc1-ed87-4697-883e-495e047b3b42"];
        };
        "cbffdbc1-ed87-4697-883e-495e047b3b42": {
            /** Format: int32 */
            guestPort?: number;
            /** Format: int64 */
            createTime?: number;
            vmId?: string;
            /** Format: int32 */
            v?: number;
            opType?: string;
            /** Format: int32 */
            hostPort?: number;
            refId?: string;
            id?: string;
            error?: string;
            orgId?: string;
        };
        "c99f208e-2e20-4116-94a6-74a32ef37e6d": components["schemas"]["4794d75c-e8e8-491e-8ea1-1420a052e4c8"][];
        "b37c70d1-0105-40b9-9813-dbd0515ebb7f": Record<string, never>;
        "24f452d5-4dc5-44de-ac0c-ccf328e172f5": {
            /** @description (typeName=java.util.Set<java.lang.String>) */
            vmIds?: components["schemas"]["55cb8fb1-459f-4f4b-a12b-399db7c4bd96"];
            /** @description (typeName=java.util.Set<com.kosdev.studio.app.service.vm.beans.VM>) */
            vms?: components["schemas"]["adc6c2df-89dc-4ecc-8d62-61ebc11c794e"];
        };
        "adc6c2df-89dc-4ecc-8d62-61ebc11c794e": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"][];
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
