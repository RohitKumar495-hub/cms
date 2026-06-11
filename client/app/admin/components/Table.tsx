import { useCMSTheme } from "@/context/CMSThemeContext";

export interface Column<T> {
    header: string;
    accessor?: keyof T;
    render?: (row: T) => React.ReactNode;
    key?: string; // optional stable key override
}

export interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
}

function Table<T extends Record<string, any>>({ data, columns }: TableProps<T>) {
    const colCount = columns.length;
    const { theme } = useCMSTheme()

    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-max w-full table-auto text-center border border-gray-400 text-xs lg:text-sm">
                <thead>
                    <tr className={`${theme === 'light' ? 'bg-gray-200' : 'bg-[#374151]'}`}>
                        {columns.map((column, i) => (
                            <th
                                key={column.key ?? column.header}
                                className="py-2 px-2"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={colCount} className="py-3">
                                No records found
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr key={(row as any).id ?? rowIndex}>
                                {columns.map((column, colIndex) => {
                                    const value =
                                        column.accessor ? row[column.accessor] : undefined;

                                    return (
                                        <td
                                            key={colIndex}
                                            className="py-3 border-b border-gray-300 px-2"
                                        >
                                            {column.render
                                                ? column.render(row)
                                                : String(value ?? "")}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;