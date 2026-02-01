import { memo } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer

} from "recharts"

function MetricChart({ data, dataKey, color, title}) {
    return (
        <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">{title}</p>

            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <XAxis dataKey="time" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip />

                    <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    dot={false}
                    strokeWidth={2}
                     />


                </LineChart>

            </ResponsiveContainer>
        </div>
    )
}

export default memo(MetricChart);