export default function ListItem({ item }) {
    return (
        <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
            <p className="text-white font-medium">
                {item.title}
            </p>
            <p className="text-gray-400 text-sm mt-1">
                {item.description}
            </p>

        </div>
    )
}