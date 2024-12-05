# Reference

## Client

<details><summary><code>client.client.<a href="/src/api/resources/client/client/Client.ts">start</a>({ ...params }) -> ScrapybaraApi.GetInstanceResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.client.start();
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

**request:** `ScrapybaraApi.DeploymentConfig`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Client.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.client.<a href="/src/api/resources/client/client/Client.ts">get</a>(instanceId) -> ScrapybaraApi.GetInstanceResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.client.get("instance_id");
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

**requestOptions:** `Client.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Instance

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">screenshot</a>(instanceId) -> ScrapybaraApi.InstanceScreenshotResponse</code></summary>
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

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">getStreamUrl</a>(instanceId) -> ScrapybaraApi.InstanceGetStreamUrlResponse</code></summary>
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

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">computer</a>(instanceId, { ...params }) -> unknown</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.computer("instance_id", {
    action: ScrapybaraApi.Action.Key,
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

**request:** `ScrapybaraApi.ComputerRequest`

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

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">bash</a>(instanceId, { ...params }) -> unknown</code></summary>
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

**request:** `ScrapybaraApi.BashRequest`

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

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">edit</a>(instanceId, { ...params }) -> unknown</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.instance.edit("instance_id", {
    command: ScrapybaraApi.Command.View,
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

**request:** `ScrapybaraApi.EditRequest`

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

<details><summary><code>client.instance.<a href="/src/api/resources/instance/client/Client.ts">stop</a>(instanceId) -> ScrapybaraApi.StopInstanceResponse</code></summary>
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

## Browser

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">start</a>(instanceId) -> ScrapybaraApi.StartBrowserResponse</code></summary>
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

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">getCdpUrl</a>(instanceId) -> ScrapybaraApi.BrowserGetCdpUrlResponse</code></summary>
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

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">authenticate</a>(instanceId, { ...params }) -> ScrapybaraApi.BrowserAuthenticateResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Authenticate browser with Anon for all available apps

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
await client.browser.authenticate("instance_id", {
    contextId: "context_id",
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

**request:** `ScrapybaraApi.BrowserAuthenticateRequest`

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

<details><summary><code>client.browser.<a href="/src/api/resources/browser/client/Client.ts">stop</a>(instanceId) -> ScrapybaraApi.StopBrowserResponse</code></summary>
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
