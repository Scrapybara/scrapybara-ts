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
 * @interface FetchHtmlRequest
 */
export interface FetchHtmlRequest {
    /**
     * The URL of the webpage to fetch HTML content from.
     * @type {string}
     * @memberof FetchHtmlRequest
     */
    url: string;
}

/**
 * Check if a given object implements the FetchHtmlRequest interface.
 */
export function instanceOfFetchHtmlRequest(value: object): value is FetchHtmlRequest {
    if (!('url' in value) || value['url'] === undefined) return false;
    return true;
}

export function FetchHtmlRequestFromJSON(json: any): FetchHtmlRequest {
    return FetchHtmlRequestFromJSONTyped(json, false);
}

export function FetchHtmlRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): FetchHtmlRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'url': json['url'],
    };
}

export function FetchHtmlRequestToJSON(value?: FetchHtmlRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'url': value['url'],
    };
}

