/* tslint:disable */
/* eslint-disable */
/**
 * Scrapybara API
 * Scrapybara API provides web automation, capybara-style. It allows users to generate, execute, and manage scripts.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  GetScriptResponse,
} from '../models/index';
import {
    GetScriptResponseFromJSON,
    GetScriptResponseToJSON,
} from '../models/index';

export interface DeleteScriptRequest {
    scriptId: string;
}

export interface GetScriptRequest {
    scriptId: string;
}

/**
 * 
 */
export class ScriptManagementApi extends runtime.BaseAPI {

    /**
     * Permanently removes a script from the system.
     * Delete script
     */
    async deleteScriptRaw(requestParameters: DeleteScriptRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['scriptId'] == null) {
            throw new runtime.RequiredError(
                'scriptId',
                'Required parameter "scriptId" was null or undefined when calling deleteScript().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-api-key"] = await this.configuration.apiKey("x-api-key"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/scripts/{script_id}`.replace(`{${"script_id"}}`, encodeURIComponent(String(requestParameters['scriptId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Permanently removes a script from the system.
     * Delete script
     */
    async deleteScript(requestParameters: DeleteScriptRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteScriptRaw(requestParameters, initOverrides);
    }

    /**
     * Retrieves detailed information about a specific script.
     * Get script
     */
    async getScriptRaw(requestParameters: GetScriptRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetScriptResponse>> {
        if (requestParameters['scriptId'] == null) {
            throw new runtime.RequiredError(
                'scriptId',
                'Required parameter "scriptId" was null or undefined when calling getScript().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-api-key"] = await this.configuration.apiKey("x-api-key"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/scripts/{script_id}`.replace(`{${"script_id"}}`, encodeURIComponent(String(requestParameters['scriptId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetScriptResponseFromJSON(jsonValue));
    }

    /**
     * Retrieves detailed information about a specific script.
     * Get script
     */
    async getScript(requestParameters: GetScriptRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetScriptResponse> {
        const response = await this.getScriptRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
