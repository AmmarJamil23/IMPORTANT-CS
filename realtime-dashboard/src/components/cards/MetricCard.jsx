import { memo } from "react";

function MetricCard({ title, value}) {
    return(
        <div className="bg-gray-900 rounded-lg p-4 shadow">
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
    )
}

export default memo(MetricCard);