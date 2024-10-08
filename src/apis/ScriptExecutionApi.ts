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
  ExecuteScriptRequest,
  ExecuteScriptResponse,
} from '../models/index';
import {
    ExecuteScriptRequestFromJSON,
    ExecuteScriptRequestToJSON,
    ExecuteScriptResponseFromJSON,
    ExecuteScriptResponseToJSON,
} from '../models/index';

export interface ExecuteScriptOperationRequest {
    executeScriptRequest: ExecuteScriptRequest;
}

/**
 * 
 */
export class ScriptExecutionApi extends runtime.BaseAPI {

    /**
     * Executes a previously generated script.
     * Execute script
     */
    async executeScriptRaw(requestParameters: ExecuteScriptOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ExecuteScriptResponse>> {
        if (requestParameters['executeScriptRequest'] == null) {
            throw new runtime.RequiredError(
                'executeScriptRequest',
                'Required parameter "executeScriptRequest" was null or undefined when calling executeScript().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["x-api-key"] = await this.configuration.apiKey("x-api-key"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/scripts/execute`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ExecuteScriptRequestToJSON(requestParameters['executeScriptRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ExecuteScriptResponseFromJSON(jsonValue));
    }

    /**
     * Executes a previously generated script.
     * Execute script
     */
    async executeScript(requestParameters: ExecuteScriptOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ExecuteScriptResponse> {
        const response = await this.executeScriptRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
