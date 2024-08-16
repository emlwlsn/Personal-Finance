import { useUser } from '@clerk/clerk-react';
import { FinancialRecordForm } from './financial-record-form.jsx';
import { FinancialRecordList } from './financial-record-list.jsx';
import { useFinancialRecords } from '../../contexts/financial-record-context.jsx';
import { useMemo } from 'react';

export const Dashboard = () => {
    const { user } = useUser();
    const { records } = useFinancialRecords();

    const totalExpenses = useMemo(() => {
        let totalAmount = 0;
        records.forEach((record) => {
            totalAmount += record.amount;
        });
        return totalAmount;
    }, [records]);


    return (
        <div className='dashboard-container'>
            <h1>Welcome {user?.firstName}! Manage your Finances Here:</h1>
            <FinancialRecordForm />
            <div>Total Expenses: ${totalExpenses}</div>
            <FinancialRecordList />
        </div>
    )
}