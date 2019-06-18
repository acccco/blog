const Core = require('@alicloud/pop-core');
const {aliyun: aliyunConfig} = require('../config/');
const {sleep} = require('./util');

const client = new Core({
  endpoint: 'https://ecs.aliyuncs.com',
  apiVersion: '2014-05-26',
  ...aliyunConfig.key
});

const startHKCES = () => {
  return client.request(
    'StartInstance',
    {
      'RegionId': 'cn-hongkong',
      'InstanceId': aliyunConfig.hkCesId
    },
    {method: 'POST'}
  );
};

const getHKCESStatus = () => {
  return client.request(
    'DescribeInstances',
    {
      'RegionId': 'cn-hongkong',
      'InstanceIds': JSON.stringify([aliyunConfig.hkCesId])
    },
    {method: 'POST'}
  ).then(res => {
    return res.Instances.Instance[0];
  });
};

const stopHKCES = () => {
  return client.request(
    'StopInstance',
    {
      'RegionId': 'cn-hongkong',
      'InstanceId': aliyunConfig.hkCesId
    },
    {method: 'POST'}
  );
};

exports.start = async () => {
  let instance = await getHKCESStatus();
  if (instance.Status === 'Stopped') {
    await startHKCES();

    while (true) {
      instance = await getHKCESStatus();
      if (instance.PublicIpAddress.IpAddress[0]) {
        break;
      }
      await sleep(1000);
    }
  }
  return instance.PublicIpAddress.IpAddress[0];
};

exports.stop = async () => {
  let instance = await getHKCESStatus();
  if (instance.Status === 'Running') {
    await stopHKCES();
  }
};


