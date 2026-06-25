global.__DEV__ = true;
global.__fbBatchedBridgeConfig = { remoteModuleConfig: [] };

const RN = require('react-native');
if (RN.NativeModules) {
  RN.NativeModules.SourceCode = { getConstants: () => ({ scriptURL: 'test' }) };
}
