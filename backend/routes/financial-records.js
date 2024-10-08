import express from 'express';
import FinancialRecordModel from '../schema/financial-record.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const records = await FinancialRecordModel.find({userId: userId});
        if (!records) {
            res.status(404).send('No records found');
        }
        res.status(200).send(records);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newRecordBody = req.body;
        const newRecord = new FinancialRecordModel(newRecordBody);
        const savedRecord = await newRecord.save();
        res.status(200).send(savedRecord);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await FinancialRecordModel.findByIdAndUpdate(
            id,
            newRecordBody,
            {new: true}
        );
        if (!record) {
            res.status(404).send();
        }
        res.status(200).send(record);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const record = await FinancialRecordModel.findByIdAndDelete(id);
        if (!record) {
            res.status(404).send();
        }
        res.status(200).send(record);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;