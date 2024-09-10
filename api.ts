// This is the entrypoint for the package
import {
  HelpersApi,
  HelpersApiApiKeys,
  ScriptExecutionApi,
  ScriptExecutionApiApiKeys,
  ScriptGenerationApi,
  ScriptGenerationApiApiKeys,
  ScriptManagementApi,
  ScriptManagementApiApiKeys,
} from "./api/apis";
import * as models from "./model/models";

export class ScrapybaraClient {
  private helpersApi: HelpersApi;
  private scriptExecutionApi: ScriptExecutionApi;
  private scriptGenerationApi: ScriptGenerationApi;
  private scriptManagementApi: ScriptManagementApi;

  constructor(apiKey: string, basePath?: string) {
    this.helpersApi = new HelpersApi(basePath);
    this.scriptExecutionApi = new ScriptExecutionApi(basePath);
    this.scriptGenerationApi = new ScriptGenerationApi(basePath);
    this.scriptManagementApi = new ScriptManagementApi(basePath);

    this.helpersApi.setApiKey(HelpersApiApiKeys.ApiKeyAuth, apiKey);
    this.scriptExecutionApi.setApiKey(
      ScriptExecutionApiApiKeys.ApiKeyAuth,
      apiKey
    );
    this.scriptGenerationApi.setApiKey(
      ScriptGenerationApiApiKeys.ApiKeyAuth,
      apiKey
    );
    this.scriptManagementApi.setApiKey(
      ScriptManagementApiApiKeys.ApiKeyAuth,
      apiKey
    );
  }

  // Helpers API
  public async fetchHtml(
    fetchRequest: models.FetchRequest,
    options?: { headers: { [name: string]: string } }
  ) {
    return this.helpersApi.fetchHtml(fetchRequest, options);
  }

  // Script Execution API
  public async executeScript(
    scriptExecutionRequest: models.ScriptExecutionRequest,
    options?: { headers: { [name: string]: string } }
  ) {
    return this.scriptExecutionApi.executeScript(
      scriptExecutionRequest,
      options
    );
  }

  // Script Generation API
  public async generateScript(
    scriptGenerationRequest: models.ScriptGenerationRequest,
    options?: { headers: { [name: string]: string } }
  ) {
    return this.scriptGenerationApi.generateScript(
      scriptGenerationRequest,
      options
    );
  }

  // Script Management API
  public async deleteScript(
    scriptId: string,
    options?: { headers: { [name: string]: string } }
  ) {
    return this.scriptManagementApi.deleteScript(scriptId, options);
  }

  public async getScript(
    scriptId: string,
    options?: { headers: { [name: string]: string } }
  ) {
    return this.scriptManagementApi.getScript(scriptId, options);
  }
}

export default ScrapybaraClient;
