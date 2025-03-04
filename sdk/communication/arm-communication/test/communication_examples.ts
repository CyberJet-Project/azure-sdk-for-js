/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  env,
  Recorder,
  RecorderStartOptions,
  delay,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import { Context } from "mocha";
import { CommunicationServiceManagementClient } from "../src/communicationServiceManagementClient";
import { hostname } from "os";

const replaceableVariables: Record<string, string> = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "88888888-8888-8888-8888-888888888888",
  COMMUNICATION_AZURE_AUTHORITY_HOST: "COMMUNICATION_AZURE_AUTHORITY_HOST",
  COMMUNICATION_RESOURCE_MANAGER_URL: "COMMUNICATION_RESOURCE_MANAGER_URL"
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("CommunicationService test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: CommunicationServiceManagementClient;
  let location: string;
  let resourceGroup: string;
  let communicationServiceName: string;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || '';
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new CommunicationServiceManagementClient(credential, subscriptionId, recorder.configureClientOptions({}));
    location = "global";
    resourceGroup = "myjstest";
    communicationServiceName = "mycommunicationServicexxx";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("communicationService create test", async function () {
    const res = await client.communicationServices.beginCreateOrUpdateAndWait(resourceGroup, communicationServiceName, { location: location, dataLocation: "UnitedStates" });
    assert.notEqual(res.id, undefined);
  });

  it("communicationService get test", async function () {
    const res = await client.communicationServices.get(resourceGroup, communicationServiceName);
    assert.equal(res.name, communicationServiceName);
  });

  it("communicationService list test", async function () {
    const resArray = new Array();
    for await (let item of client.communicationServices.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 2);//have existing resource when testing in this release time
  });

  it("communicationService delete test", async function () {
    const res = await client.communicationServices.beginDeleteAndWait(resourceGroup, communicationServiceName, testPollingOptions);
    const resArray = new Array();
    for await (let item of client.communicationServices.listByResourceGroup(resourceGroup)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);//have existing resource when testing in this release time
  });
});
