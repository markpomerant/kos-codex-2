export interface paths {
    "/api/devices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all known devices. (v1.0) */
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
                        "application/json": components["schemas"]["ac16d00c-4161-4074-ac42-c595fadb396e"];
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
    "/api/devices/instances": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Return all device instances in the current project. (v1.0) */
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
                        "application/json": components["schemas"]["de8b17e7-6b28-4af3-8a76-03f252a7bd82"];
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
        "ac16d00c-4161-4074-ac42-c595fadb396e": components["schemas"]["d946118f-387d-4981-9fa9-c7f9fdf75d53"][];
        "d946118f-387d-4981-9fa9-c7f9fdf75d53": {
            /** @description (typeName=java.util.Collection<com.kosdev.studio.commons.sync.data.NodeTypeSyncBean>) */
            nodeTypes?: components["schemas"]["59f5ea6a-c00c-4507-899e-93ba298b7d09"];
            /** @description (typeName=com.kosdev.studio.commons.sync.data.DeviceSyncBean) */
            bean?: components["schemas"]["f10a4ced-58ae-42bd-8d29-fe96a7c6d227"];
        };
        "59f5ea6a-c00c-4507-899e-93ba298b7d09": components["schemas"]["f37befac-4764-4bd4-82c5-642f78b787af"][];
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
        "f10a4ced-58ae-42bd-8d29-fe96a7c6d227": {
            hidden?: boolean;
            opType?: string;
            manifestPropertiesJson?: string;
            error?: string;
            type?: string;
            orgId?: string;
            /** Format: int64 */
            createTime?: number;
            createdBy?: string;
            /** Format: int32 */
            v?: number;
            refId?: string;
            id?: string;
            locked?: boolean;
            desc?: string;
        };
        "de8b17e7-6b28-4af3-8a76-03f252a7bd82": components["schemas"]["0abd52a2-6aa9-40e5-bc0c-56b9eaba2f70"][];
        "0abd52a2-6aa9-40e5-bc0c-56b9eaba2f70": {
            /** @description (typeName=com.kosdev.kos.commons.util.MultiValueMap<java.lang.String, com.kosdev.studio.commons.sync.data.NodeInstanceSyncBean>) */
            nodes?: components["schemas"]["636721cd-a61f-45de-b634-9b06e3810121"];
            deviceId?: string;
            /** @description (typeName=com.kosdev.studio.commons.sync.data.DeviceInstanceSyncBean) */
            bean?: components["schemas"]["395355fa-333f-4826-be38-d33715b2cc59"];
        };
        "636721cd-a61f-45de-b634-9b06e3810121": {
            empty?: boolean;
        };
        "395355fa-333f-4826-be38-d33715b2cc59": {
            hidden?: boolean;
            opType?: string;
            error?: string;
            deviceId?: string;
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
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
