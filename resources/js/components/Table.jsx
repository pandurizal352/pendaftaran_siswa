import React from "react";
import clsx from "clsx";

export default function Table({
    columns,
    data,
    color = "blue",
    rowKey = "id",
    actions = null,
}) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
            <table className="w-full table-auto border-collapse">
                {/* HEADER */}
                <thead
                    className={clsx(
                        "text-white",
                        color === "blue" &&
                            "bg-gradient-to-r from-[#05445E] to-[#189AB4]",
                        color === "green" &&
                            "bg-gradient-to-r from-green-600 to-green-400"
                    )}
                >
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide"
                            >
                                {col.title}
                            </th>
                        ))}

                        {/* hanya render kolom aksi kalau props actions ada */}
                        {actions ? (
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                                Aksi
                            </th>
                        ) : null}
                    </tr>
                </thead>

                {/* BODY */}
                <tbody>
                    {data.map((row, idx) => (
                        <tr
                            key={row[rowKey] || idx}
                            className={clsx(
                                "transition-colors duration-200",
                                idx % 2 === 0 ? "bg-gray-50" : "bg-white",
                                color === "blue" && "hover:bg-blue-50",
                                color === "green" && "hover:bg-green-50"
                            )}
                        >
                            {columns.map((col, i) => (
                                <td
                                    key={i}
                                    className="border-t px-6 py-3 text-sm"
                                >
                                    {typeof col.render === "function"
                                        ? col.render(row[col.key], row)
                                        : row[col.key]}
                                </td>
                            ))}

                            {/* hanya render isi kolom aksi kalau props actions ada */}
                            {actions ? (
                                <td className="border-t px-6 py-3 text-sm">
                                    {actions(row)}
                                </td>
                            ) : null}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
