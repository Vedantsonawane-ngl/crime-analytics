import React from 'react';
import { SkeletonLoader } from './Loader';
import { EmptyState } from './EmptyState';

export const Table = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyTitle = 'No Records Found',
  emptyDescription,
}) => {
  if (isLoading) {
    return <SkeletonLoader count={5} className="h-14" />;
  }

  if (!data || data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="w-full overflow-x-auto border border-[#2A3246] rounded-[24px] bg-[#151A28] shadow-xl">
      <table className="w-full text-left text-sm text-[#E5E7EB] border-collapse">
        <thead className="bg-[#1A2133] text-xs uppercase tracking-wider text-[#9CA3AF] border-b border-[#2A3246] sticky top-0 z-10">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`px-6 py-4 font-semibold ${col.headerClassName || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2A3246]/60">
          {data.map((row, rowIdx) => (
            <tr
              key={row.id || rowIdx}
              className="hover:bg-[#1E2638]/70 transition-colors duration-150 group"
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx} className={`px-6 py-4 ${col.className || ''}`}>
                  {col.cell ? col.cell(row, rowIdx) : row[col.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
