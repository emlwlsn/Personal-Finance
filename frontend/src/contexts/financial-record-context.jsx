import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export const FinancialRecordsContext = createContext(undefined);

export const FinancialRecordProvider = ({ children }) => {
    const [records, setRecords] = useState([]);

    const { user } = useUser();

    const fetchRecords = async () => {
        if (!user) return;
        const response = await fetch(`http://localhost:3000/financial-records/${user?.id}`);

        try {
            if (response.ok) {
                const records = await response.json();
                console.log(records);
                setRecords(records);
            }
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [user]);

    const addRecord = async (record) => {
        const response = await fetch("http://localhost:3000/financial-records", {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            },
        });

        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            }
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };

    const updateRecord = async (id, newRecord) => {
        const response = await fetch(`http://localhost:3000/financial-records/${id}`, {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: {
                "Content-Type": "application/json",
            },
        });

        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => prev.map((record) => (record._id === id ? newRecord : record)));
            }
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };

    const deleteRecord = async (id) => {
        const response = await fetch(`http://localhost:3000/financial-records/${id}`, {
            method: "DELETE",
        });

        try {
            if (response.ok) {
                const deletedRecord = await response.json();
                setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id));
            }
        } catch (error) {
            console.error("Error adding record:", error);
        }
    };

    return (
        <FinancialRecordsContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
            {children}
        </FinancialRecordsContext.Provider>
    );
};

export const useFinancialRecords = () => {
    const context = useContext(FinancialRecordsContext);
    if (context === undefined) {
        throw new Error('useFinancialRecords must be used within a FinancialRecordProvider');
    }
    return context;
};
