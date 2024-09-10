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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface GenerateScriptNonStreamingResponse
 */
export interface GenerateScriptNonStreamingResponse {
    /**
     * Unique identifier for the generated script.
     * @type {string}
     * @memberof GenerateScriptNonStreamingResponse
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof GenerateScriptNonStreamingResponse
     */
    streaming: boolean;
}

/**
 * Check if a given object implements the GenerateScriptNonStreamingResponse interface.
 */
export function instanceOfGenerateScriptNonStreamingResponse(value: object): value is GenerateScriptNonStreamingResponse {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('streaming' in value) || value['streaming'] === undefined) return false;
    return true;
}

export function GenerateScriptNonStreamingResponseFromJSON(json: any): GenerateScriptNonStreamingResponse {
    return GenerateScriptNonStreamingResponseFromJSONTyped(json, false);
}

export function GenerateScriptNonStreamingResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GenerateScriptNonStreamingResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'streaming': json['streaming'],
    };
}

export function GenerateScriptNonStreamingResponseToJSON(value?: GenerateScriptNonStreamingResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'streaming': value['streaming'],
    };
}

