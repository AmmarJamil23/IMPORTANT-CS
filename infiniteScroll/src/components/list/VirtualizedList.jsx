import { useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import ListItem from "./ListItem"

export default function VirtualizedList({ items }) {
    const parentRef = useRef(null);

    const rowVirtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 96,
        overscan: 5
    });


    return (
        <div
        ref={parentRef}
        className="h-150 overflow-auto mt-6"
        >

            <div
            style= {{
                height: `${rowVirtualizer.getTotalSize()}px`,
                position: "relative"
            }}
            >
                {rowVirtualizer.getVirtualItems().map(virtualRow => {
                    const item = items[virtualRow.index];

                    return (
                        <div
                        key={virtualRow.key}
                        style={{
                            position:"absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            transform: `translateY(${virtualRow.start}px)`
                        }}
                        className="px-1 pb-3"
                        >
                            <ListItem item={item} />

                        </div>
                    )
                })}

            </div>

        </div>
    )
}