import config from '../config';

import Requests from '../utils/requests';

const get = token => new Promise((resolve, reject) => {
  Requests.get(token, `${config.cron_url}/v1/jobs`)
    .then((obj) => {
      resolve(obj);
    })
    .catch((err) => {
      reject(err);
    });
});


const put = (token, body) => new Promise((resolve, reject) => {
  const calls = [];
  body.forEach((obj) => {
    const element = obj.spec;
    calls.push(Requests.put(token, `${config.cron_url}/v1/jobs/${obj.jobId}`, element));
  });

  Promise.all(calls)
    .then((flows) => {
      const ret = [];
      flows.forEach((item) => {
        ret.push(item.data);
      });
      resolve(ret);
    })
    .catch((err) => {
      reject(err);
    });
});


export default { get, put };
