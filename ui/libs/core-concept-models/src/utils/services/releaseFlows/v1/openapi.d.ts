export interface paths {
    "/api/releaseFlows": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create a new release flow (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["489e1e00-640c-4572-b65b-1028fb771ac4"];
                };
            };
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/releaseFlows/tag": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create a new release flow tag (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["489e1e00-640c-4572-b65b-1028fb771ac4"];
                };
            };
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/releaseFlows/branch": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create a new release flow branch (v1.0) */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["489e1e00-640c-4572-b65b-1028fb771ac4"];
                };
            };
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
        "489e1e00-640c-4572-b65b-1028fb771ac4": {
            name?: string;
            json?: string;
            parentNodeId?: string;
            desc?: string;
        };
        "24f452d5-4dc5-44de-ac0c-ccf328e172f5": {
            /** @description (typeName=java.util.Set<java.lang.String>) */
            vmIds?: components["schemas"]["55cb8fb1-459f-4f4b-a12b-399db7c4bd96"];
            /** @description (typeName=java.util.Set<com.kosdev.studio.app.service.vm.beans.VM>) */
            vms?: components["schemas"]["adc6c2df-89dc-4ecc-8d62-61ebc11c794e"];
        };
        "55cb8fb1-459f-4f4b-a12b-399db7c4bd96": string[];
        "adc6c2df-89dc-4ecc-8d62-61ebc11c794e": components["schemas"]["01eba9db-a501-42d1-9449-d5a9403f426d"][];
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
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
