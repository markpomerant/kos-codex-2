export interface paths {
    "/api/release/candidate/{versionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create a new release candidate for the specified version (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the version to create the release for. */
                    versionId: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["58f6e2ab-f710-4104-8752-6b74761af8e6"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["fadcf088-7d24-40ed-953e-f3d4c638c25e"];
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
    "/api/release/build/usb": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Build a usb update zip file for the specified queue entry. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["b0bf9926-870d-45c5-a762-b8beaaee4fcf"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["1c7880a9-1da1-4d46-9294-a5ff433230b8"];
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
    "/api/release/build/mfg": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Build a manufacturing file for the specified release candidate. (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["37673968-b847-4c30-9ea5-d4c4f2226495"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["1c7880a9-1da1-4d46-9294-a5ff433230b8"];
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
    "/api/release/manifest/{manifestId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the specified release manifest. (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the manifest to return. */
                    manifestId: string;
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
                        "application/json": components["schemas"]["d24a0548-4e9e-44a4-b846-ed60b5613d66"];
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
    "/api/release/templates": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the list of available release templates (v1.0) */
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
                        "application/json": components["schemas"]["6257e118-2de9-4607-9807-f0a0e5762819"];
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
    "/api/release/templates/{templateId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return the specified release template (v1.0) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Id of the template to return. */
                    templateId: string;
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
                        "application/json": components["schemas"]["68c5c436-38e5-4ceb-8c56-f97d3985e6f0"];
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
        "58f6e2ab-f710-4104-8752-6b74761af8e6": {
            test?: boolean;
            /** @description (typeName=java.util.List<java.lang.String>) */
            refEntryIds?: components["schemas"]["4ea78a42-8664-4f8b-b49a-9cc54bb5827e"];
            desc?: string;
        };
        "4ea78a42-8664-4f8b-b49a-9cc54bb5827e": string[];
        "fadcf088-7d24-40ed-953e-f3d4c638c25e": unknown;
        "b0bf9926-870d-45c5-a762-b8beaaee4fcf": {
            directory?: string;
            queueEntryId?: string;
        };
        "1c7880a9-1da1-4d46-9294-a5ff433230b8": {
            reason?: string;
            note?: string;
            /** @description (typeName=com.kosdev.kos.commons.util.ReasonData) */
            reasonData?: components["schemas"]["7a606a90-74a2-4ad1-9f44-2cd1b7ce5733"];
            /** @description (typeName=com.kosdev.kos.commons.util.concurrent.future.FutureWork) */
            rootFuture?: components["schemas"]["1c7880a9-1da1-4d46-9294-a5ff433230b8"];
            tracker?: string;
            /** Format: int64 */
            remainingTimeMs?: number;
            name?: string;
            /** Format: int32 */
            progress?: number;
            /** @description (typeName=java.util.Map<java.lang.String, com.kosdev.kos.commons.util.json.JsonViewWrapper>) */
            clientAttributes?: components["schemas"]["5d531599-9bd5-425f-b642-5ad27a54f4d4"];
            /** Format: int32 */
            id?: number;
            /** Format: int32 */
            abortAbandonedTimeoutMs?: number;
            /** @description (typeName=com.kosdev.kos.commons.util.json.JsonViewWrapper) */
            clientData?: components["schemas"]["38c0e690-4ef8-4d0c-8b2f-d16b648cb6e4"];
        };
        "7a606a90-74a2-4ad1-9f44-2cd1b7ce5733": {
            /** @description (typeName=java.lang.Class<?>) */
            view?: components["schemas"]["f6ab399c-fbd3-4647-9416-30af587e543a"];
            data?: Record<string, never>;
        };
        "f6ab399c-fbd3-4647-9416-30af587e543a": unknown;
        /** @description (typeName=com.kosdev.kos.commons.util.json.JsonViewWrapper) */
        "5d531599-9bd5-425f-b642-5ad27a54f4d4": components["schemas"]["38c0e690-4ef8-4d0c-8b2f-d16b648cb6e4"];
        "38c0e690-4ef8-4d0c-8b2f-d16b648cb6e4": {
            /** @description (typeName=java.lang.Class<?>) */
            view?: components["schemas"]["f6ab399c-fbd3-4647-9416-30af587e543a"];
            data?: Record<string, never>;
        };
        "37673968-b847-4c30-9ea5-d4c4f2226495": {
            releaseCandidateId?: string;
            directory?: string;
        };
        "d24a0548-4e9e-44a4-b846-ed60b5613d66": {
            deviceType?: string;
            /** @description (typeName=java.util.Map<java.lang.String, java.lang.String>) */
            properties?: components["schemas"]["e8650a8f-093e-44ab-8929-c44399d1cf2d"];
            /** @description (typeName=com.kosdev.kos.commons.manifest.device.ManifestDeviceInfo) */
            deviceInfo?: components["schemas"]["175d54ac-c40d-4be6-83b9-c5bfadcea763"];
        };
        "e8650a8f-093e-44ab-8929-c44399d1cf2d": string;
        "175d54ac-c40d-4be6-83b9-c5bfadcea763": {
            /** @description (typeName=java.util.Collection<? extends com.kosdev.kos.commons.manifest.device.ManifestNodeInfo>) */
            nodes?: components["schemas"]["02896fea-ef13-42f1-a324-aa4b92fb1ea2"];
            /** @description (typeName=java.util.Set<java.lang.String>) */
            nodeTypes?: components["schemas"]["6c01f94e-730c-41cd-bffd-66c60600b759"];
        };
        "02896fea-ef13-42f1-a324-aa4b92fb1ea2": components["schemas"]["ed54d387-2c17-4c78-811b-49b4bd70573e"][];
        "ed54d387-2c17-4c78-811b-49b4bd70573e": {
            nodeName?: string;
            optional?: boolean;
            nodeType?: string;
            /** @description (typeName=com.kosdev.kos.commons.util.NodeId) */
            nodeId?: components["schemas"]["37e5986d-e8c4-4b7a-aed7-242199ecd59a"];
            primary?: boolean;
        };
        "37e5986d-e8c4-4b7a-aed7-242199ecd59a": {
            nodeName?: string;
            id?: string;
            nodeType?: string;
        };
        "6c01f94e-730c-41cd-bffd-66c60600b759": string[];
        "6257e118-2de9-4607-9807-f0a0e5762819": components["schemas"]["68c5c436-38e5-4ceb-8c56-f97d3985e6f0"][];
        "68c5c436-38e5-4ceb-8c56-f97d3985e6f0": {
            /** @description (typeName=java.util.Collection<com.kosdev.studio.app.service.release.beans.ReleaseVersion>) */
            versions?: components["schemas"]["1ffb54de-da6d-4501-96dc-9bb1988620da"];
            /** @description (typeName=java.util.Collection<com.kosdev.studio.app.service.release.beans.ReleaseTemplateQueue>) */
            queues?: components["schemas"]["9118c7b0-4257-4490-b30f-929ddd8ff7f9"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.ReleaseTemplateSyncBean) */
            bean?: components["schemas"]["5bb857ec-065a-469b-ae1a-03d2764f4375"];
        };
        "1ffb54de-da6d-4501-96dc-9bb1988620da": components["schemas"]["907cd7f5-d7e7-4dec-8fd5-410bb4107995"][];
        "907cd7f5-d7e7-4dec-8fd5-410bb4107995": {
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.release.beans.ReleaseCandidate>) */
            candidates?: components["schemas"]["8dd5f48b-6445-41bb-b4e3-171fda1c0d4e"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.ReleaseVersionSyncBean) */
            bean?: components["schemas"]["d3d901d8-3780-4f6d-b382-92e074a4c8ad"];
        };
        "8dd5f48b-6445-41bb-b4e3-171fda1c0d4e": components["schemas"]["46ff8bd5-3abf-4c18-a5c7-7c53a7fb5b5a"][];
        "46ff8bd5-3abf-4c18-a5c7-7c53a7fb5b5a": {
            /** @description (typeName=com.kosdev.studio.app.service.release.beans.json.ReleaseCandidateDataJson) */
            data?: components["schemas"]["b5bbe0da-a103-44b7-9f25-2c550f44a31d"];
            /** Format: int64 */
            createTime?: number;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.ReleaseCandidateSyncBean) */
            bean?: components["schemas"]["f5e22588-2522-49d0-808c-7a1a9333e0a6"];
        };
        "b5bbe0da-a103-44b7-9f25-2c550f44a31d": {
            /** Format: int32 */
            rcNum?: number;
            versionId?: string;
            boardType?: string;
            somType?: string;
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.release.beans.json.BootQueueJson>) */
            queues?: components["schemas"]["e7896235-7088-4d75-b146-03dc39ffbf65"];
            arch?: string;
            templateId?: string;
        };
        "e7896235-7088-4d75-b146-03dc39ffbf65": components["schemas"]["de250573-4043-46b8-a73e-6f333559a8c2"][];
        "de250573-4043-46b8-a73e-6f333559a8c2": {
            /** @description (typeName=java.util.List<com.kosdev.studio.app.service.release.beans.json.BootQueueEntryJson>) */
            entries?: components["schemas"]["54ad3d89-277f-4e98-9fe0-3dfe1020d865"];
            name?: string;
            id?: string;
        };
        "54ad3d89-277f-4e98-9fe0-3dfe1020d865": components["schemas"]["3a7143af-8a04-47d8-9af9-df6de3552d28"][];
        "3a7143af-8a04-47d8-9af9-df6de3552d28": {
            pin?: boolean;
            /** Format: int32 */
            pos?: number;
            vmId?: string;
            name?: string;
            id?: string;
            refEntryJsonId?: string;
            manifestKabId?: string;
            entryId?: string;
        };
        "f5e22588-2522-49d0-808c-7a1a9333e0a6": {
            /** Format: int32 */
            rcNum?: number;
            testSigned?: boolean;
            createdBy?: string;
            id?: string;
            releaseable?: boolean;
            uiJson?: string;
            desc?: string;
        };
        "d3d901d8-3780-4f6d-b382-92e074a4c8ad": {
            createdBy?: string;
            id?: string;
            /** Format: int32 */
            nextRcNum?: number;
            locked?: boolean;
            version?: string;
        };
        "9118c7b0-4257-4490-b30f-929ddd8ff7f9": components["schemas"]["bd9cc94b-071f-43d9-9726-4f0a9a240be3"][];
        "bd9cc94b-071f-43d9-9726-4f0a9a240be3": {
            /** @description (typeName=java.util.List<com.kosdev.studio.commons.sync.data.ReleaseTemplateQueueEntrySyncBean>) */
            entries?: components["schemas"]["3ba0a7d9-83fc-4bd2-8c08-4a1e4082868f"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.ReleaseTemplateQueueSyncBean) */
            bean?: components["schemas"]["7efdb415-583e-46a4-9e19-076dc3f5e92d"];
        };
        "3ba0a7d9-83fc-4bd2-8c08-4a1e4082868f": components["schemas"]["ddbd0c1a-fec3-42fe-8248-aeea74417dd3"][];
        "ddbd0c1a-fec3-42fe-8248-aeea74417dd3": {
            pin?: boolean;
            /** Format: int32 */
            pos?: number;
            vmId?: string;
            createdBy?: string;
            id?: string;
        };
        "7efdb415-583e-46a4-9e19-076dc3f5e92d": {
            createdBy?: string;
            name?: string;
            id?: string;
            desc?: string;
        };
        "5bb857ec-065a-469b-ae1a-03d2764f4375": {
            hidden?: boolean;
            createdBy?: string;
            authority?: string;
            name?: string;
            id?: string;
            locked?: boolean;
            desc?: string;
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
