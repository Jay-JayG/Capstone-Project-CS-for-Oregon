import React, { useState } from 'react';

export default function DataPage() {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (item) => {
        setSelectedItem(item);
        console.log(item);
    };

    return (
        <div>
            <select value={selectedItem} onChange={(event) => handleSelect(event.target.value)}>
                <option value="item1">item1</option>
                <option value="item2">item2</option>
            </select>

            {selectedItem === "item1" && <embed src="/src/assets/Understanding growth mindset practices.pdf" type="application/pdf" width="97%" height="800px" />}
            {selectedItem === "item2" && <embed src="/src/assets/ECS E-textiles Curriculum Research publication overview 2022 .pdf" type="application/pdf" width="97%" height="800px" />}
        </div>
    );
}