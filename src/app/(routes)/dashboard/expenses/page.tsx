'use client'
import React, { useState, useEffect } from 'react';
import { desc } from 'drizzle-orm'; // or whatever your ORM provides

import { useUser } from '@clerk/nextjs';
import { db } from '../../../../../utils/dbConfig';
import { Expenses } from '../../../../../utils/schema';


function ExpensesPage() {
  const [expensesList, setExpensesList] = useState([]);
  const {user}=useUser();

  const getAllExpenses = async () => {
    try {
      const result = await db
        .select()
        .from(Expenses)
        .orderBy(desc(Expenses.id));

      console.log("Fetched expenses:", result);
      setExpensesList(result);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    getAllExpenses();
  }, [user]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 className='font-bold text-lg'>All Expenses</h2>

      {expensesList.length === 0 ? (
        <p>No expenses found.</p>
      ) : 
      
      ( <div className='grid border rounded-lg  hover:shadow-lg hover:bg-green-50'>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {expensesList.map((expenses:any) => (
            <li key={expenses.id} style={{ marginBottom: '1rem' }}>
              <strong>{expenses.name}</strong><br />
              Amount: Nrs.{expenses.amount}<br />
              Date: {expenses.createdAt}
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
}

export default ExpensesPage;
