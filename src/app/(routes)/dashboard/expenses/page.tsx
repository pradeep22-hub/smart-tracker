'use client'
import React, { useEffect, useState } from 'react';
;
import { eq, desc } from 'drizzle-orm';

import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Budgets, Expenses } from '../../../../../utils/schema';
import { db } from '../../../../../utils/dbConfig';

interface ExpenseWithBudget {
  id: number;
  name: string;
  amount: number;
  createdAt: string; // varchar("createdAT")
  budget_name: string | null;
}

type SortField = 'amount' | 'date';
type SortOrder = 'asc' | 'desc';

const AllUserExpenses = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState<ExpenseWithBudget[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    fetchAllExpenses();
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
        .where(eq(Budgets.createdBy, user!.primaryEmailAddress!.emailAddress))
        .orderBy(desc(Expenses.id));

      setExpenses(result);
    } catch (err) {
      console.error('Fetch expenses failed:', err);
      toast.error('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  // 🔽 Merge Sort Algorithm
  const mergeSort = (array: ExpenseWithBudget[], field: SortField, order: SortOrder): ExpenseWithBudget[] => {
    if (array.length <= 1) return array;

    const middle = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, middle), field, order);
    const right = mergeSort(array.slice(middle), field, order);

    return merge(left, right, field, order);
  };

  const merge = (
    left: ExpenseWithBudget[],
    right: ExpenseWithBudget[],
    field: SortField,
    order: SortOrder
  ): ExpenseWithBudget[] => {
    const result: ExpenseWithBudget[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      let leftValue: number;
      let rightValue: number;

      if (field === 'amount') {
        leftValue = Number(left[i].amount);
        rightValue = Number(right[j].amount);
      } else {
        leftValue = new Date(left[i].createdAt).getTime();
        rightValue = new Date(right[j].createdAt).getTime();
      }

      const comparison = order === 'asc' ? leftValue <= rightValue : leftValue >= rightValue;
      if (comparison) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    // Add remaining elements
    return result.concat(left.slice(i)).concat(right.slice(j));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedExpenses = mergeSort([...expenses], sortField, sortOrder);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">All My Expenses</h2>

      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          <div className="h-6 bg-slate-200 rounded w-1/2"></div>
          <div className="h-6 bg-slate-200 rounded w-full"></div>
        </div>
      ) : sortedExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <div className="w-full overflow-x-auto border rounded-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm font-semibold text-gray-700">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Budget</th>
                <th
                  className="py-3 px-4 cursor-pointer select-none"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center gap-1">
                    Amount
                    {sortField === 'amount' &&
                      (sortOrder === 'asc' ? (
                        <ArrowUp size={16} />
                      ) : (
                        <ArrowDown size={16} />
                      ))}
                  </div>
                </th>
                <th
                  className="py-3 px-4 cursor-pointer select-none"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    Date
                    {sortField === 'date' &&
                      (sortOrder === 'asc' ? (
                        <ArrowUp size={16} />
                      ) : (
                        <ArrowDown size={16} />
                      ))}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map((expense) => (
                <tr key={expense.id} className="border-t text-sm">
                  <td className="py-2 px-4">{expense.name}</td>
                  <td className="py-2 px-4">{expense.budget_name}</td>
                  <td className="py-2 px-4">Nrs.{Number(expense.amount).toFixed(2)}</td>
                  <td className="py-2 px-4">
                    {new Date(expense.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUserExpenses;