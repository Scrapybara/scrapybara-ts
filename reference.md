# Reference

<details><summary><code>client.<a href="/src/Client.ts">getAuthStates</a>() -> Scrapybara.AuthStateResponse[]</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.getAuthStates();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `ScrapybaraClient.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

##

## Instance

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">screenshot</a>(instanceId) -> Scrapybara.InstanceScreenshotResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.screenshot("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">getStreamUrl</a>(instanceId) -> Scrapybara.InstanceGetStreamUrlResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.getStreamUrl("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">computer</a>(instanceId, { ...params }) -> Scrapybara.ComputerResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.computer("instance_id", {
    action: "move_mouse",
    coordinates: [1],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.Request`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">bash</a>(instanceId, { ...params }) -> Scrapybara.BashResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.bash("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.BashRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">edit</a>(instanceId, { ...params }) -> Scrapybara.EditResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.edit("instance_id", {
    command: "view",
    path: "path",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.EditRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">file</a>(instanceId, { ...params }) -> Scrapybara.FileResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.file("instance_id", {
    command: "command",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.FileRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">upload</a>(file, instanceId, { ...params }) -> Scrapybara.UploadResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Upload a file to the instance.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.upload(fs.createReadStream("/path/to/your/file"), "instance_id", {
    path: "path",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**file:** `File | fs.ReadStream | Blob`

</dd>
</dl>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.BodyUploadV1InstanceInstanceIdUploadPost`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">stop</a>(instanceId) -> Scrapybara.StopInstanceResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.stop("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">pause</a>(instanceId) -> Scrapybara.StopInstanceResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.pause("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">resume</a>(instanceId, { ...params }) -> Scrapybara.GetInstanceResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.resume("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.InstanceResumeRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Instance.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Browser

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">start</a>(instanceId) -> Scrapybara.StartBrowserResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browser.start("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browser.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">getCdpUrl</a>(instanceId) -> Scrapybara.BrowserGetCdpUrlResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browser.getCdpUrl("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browser.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">getCurrentUrl</a>(instanceId) -> Scrapybara.BrowserGetCurrentUrlResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browser.getCurrentUrl("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browser.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">saveAuth</a>(instanceId, { ...params }) -> Scrapybara.SaveBrowserAuthResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browser.saveAuth("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.BrowserSaveAuthRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browser.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">modifyAuth</a>(instanceId, { ...params }) -> Scrapybara.ModifyBrowserAuthResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browser.modifyAuth("instance_id", {
    authStateId: "auth_state_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.BrowserModifyAuthRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browser.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">authenticate</a>(instanceId, { ...params }) -> Scrapybara.BrowserAuthenticateResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browser.authenticate("instance_id", {
    authStateId: "auth_state_id",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.BrowserAuthenticateRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browser.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">stop</a>(instanceId) -> Scrapybara.StopBrowserResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.browser.stop("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Browser.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Code

<details><summary><code>client.code.<a href="/src/api/resources/code/client/Client.ts">execute</a>(instanceId, { ...params }) -> unknown</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.code.execute("instance_id", {
    code: "code",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.CodeExecuteRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Code.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Notebook

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">listKernels</a>(instanceId) -> Scrapybara.KernelInfo[]</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.listKernels("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">create</a>(instanceId, { ...params }) -> Scrapybara.Notebook</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.create("instance_id", {
    name: "name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.CreateNotebookRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">get</a>(instanceId, notebookId) -> Scrapybara.Notebook</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.get("instance_id", "notebook_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**notebookId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">delete</a>(instanceId, notebookId) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.delete("instance_id", "notebook_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**notebookId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">addCell</a>(instanceId, notebookId, { ...params }) -> Scrapybara.NotebookCell</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.addCell("instance_id", "notebook_id", {
    type: "code",
    content: "content",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**notebookId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.AddCellRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">executeCell</a>(instanceId, notebookId, cellId, { ...params }) -> Scrapybara.NotebookCell</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.executeCell("instance_id", "notebook_id", "cell_id", {});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**notebookId:** `string`

</dd>
</dl>

<dl>
<dd>

**cellId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.ExecuteCellRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.notebook.<a href="/src/api/resources/notebook/client/Client.ts">execute</a>(instanceId, notebookId, { ...params }) -> Scrapybara.NotebookCell[]</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notebook.execute("instance_id", "notebook_id", {});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**notebookId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.ExecuteCellRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Notebook.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Env

<details><summary><code>client.env.<a href="/src/api/resources/env/client/Client.ts">get</a>(instanceId) -> Scrapybara.EnvGetResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.env.get("instance_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Env.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.env.<a href="/src/api/resources/env/client/Client.ts">set</a>(instanceId, { ...params }) -> Scrapybara.EnvResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.env.set("instance_id", {
    variables: {
        key: "value",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.EnvSetRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Env.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.env.<a href="/src/api/resources/env/client/Client.ts">delete</a>(instanceId, { ...params }) -> Scrapybara.EnvResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.env.delete("instance_id", {
    keys: ["keys"],
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**instanceId:** `string`

</dd>
</dl>

<dl>
<dd>

**request:** `Scrapybara.EnvDeleteRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Env.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
