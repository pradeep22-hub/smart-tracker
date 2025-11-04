'use client'
import React, { useEffect, useState } from 'react';

import { eq, desc, sql } from 'drizzle-orm';

import { useUser } from '@clerk/nextjs';

import { toast } from 'sonner';
import { db } from '../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../utils/schema';
import ExpenseListTable from './_components/ExpenseListTable';
import { date, varchar } from 'drizzle-orm/mysql-core';

interface ExpenseWithBudget {
  id: number;
  name: string;
  amount: number;
  created_at: string;
  budget_name: string | null;
}

const AllUserExpenses = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState<ExpenseWithBudget[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchAllExpenses();
  }, [user]);

  const fetchAllExpenses = async () => {
    setLoading(true);
    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
          budget_name: Budgets.name,
        })
        .from(Expenses)
        .leftJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress!))
        .orderBy(desc(Expenses.id));

      setExpenses(result);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">All My Expenses</h2>

      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          <div className="h-6 bg-slate-200 rounded w-1/2"></div>
          <div className="h-6 bg-slate-200 rounded w-full"></div>
        </div>
      ) : expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ExpenseListTable
          expensesList={expenses.map((e) => ({
            ...e,
            amount: Number(e.amount),
            
          }))}
          refreshData={fetchAllExpenses}
        />
      )}
    </div>
  );
};

export default AllUserExpenses;
