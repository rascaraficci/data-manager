import { Router } from 'express';
import { body, validationResult } from 'express-validator/check';
import requestImport from '../services/requestsImport';

const router = Router();

router.post('/import', [
  body('templates', 'Not exist').exists(),
  body('templates', 'Need to be array').isArray(),
  // check object into array;
  body('templates.*.id').exists().isInt(),
  body('templates.*.label').exists().isString(),
  body('templates.*.attrs').exists().isArray(),
  body('templates.*.attrs.*.label').exists().isString(),
  body('templates.*.attrs.*.type').exists().isString(),
  body('templates.*.attrs.*.value_type').exists().isString(),
  // check devices;
  body('devices', 'Not exist').exists(),
  body('devices', 'Need to be array').isArray(),
  // check object into array;
  body('devices.*.id').exists().isString(),
  body('devices.*.label').exists().isString(),
  body('devices.*.templates').exists().isArray(),
  body('devices.*.attrs').exists().isArray(),
  // check flow remote nodes
  body('flowRemoteNodes', 'Not exist').exists(),
  body('flowRemoteNodes', 'Need to be array').isArray(),
  // check object into array;
  body('flowRemoteNodes.*.id').exists().isString(),
  body('flowRemoteNodes.*.image').exists().isString(),
  // check flows
  body('flows', 'Not exist').exists(),
  body('flows', 'Need to be array').isArray(),
  // check object into array
  body('flows.*.name').exists().isString(),
  body('flows.*.enabled').exists().isBoolean(),
  body('flows.*.flow').exists().isArray(),
  // check object into array
  body('flows.*.flow.*.type').exists().isString(),

  // check cron jobs
  body('cronJobs', 'Need to be array').optional().isArray(),
  // check object into array
  body('cronJobs.*.jobId').exists().isString(),
  body('cronJobs.*.spec').exists()



], (req, res) => {
  const rawToken = req.get('authorization');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  return requestImport.post(rawToken, req.body)
    .then((ret) => {
      res.status(201).json(ret);
    })
    .catch((err) => {
      const error = {
        message: err.toString(),
      };
      res.status(400).json(error);
    });
});

export default router;
