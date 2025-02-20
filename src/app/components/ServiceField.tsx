import { useState } from "react";
import SearchableDropdown from "./SearchableDropdown";

interface Serivce {
    code: string;
    name: string;
}

const serviceOptions: Serivce[] = [
    { code: "NYC", name: "New York" },
    { code: "LAX", name: "Los Angeles" },
    { code: "CHI", name: "Chicago" },
    { code: "HOU", name: "Houston" },
    { code: "MIA", name: "Miami" },
];

export default function ServiceField() {
    const [selectedBranch, setSelectedBranch] = useState<Serivce | null>(null);

    const handleBranchSelect = (branch: Serivce | null) => {
        setSelectedBranch(branch);
    };

    return (
        <div className="p-4">
            <SearchableDropdown
                options={serviceOptions}
                value={selectedBranch}
                onChange={handleBranchSelect}
                placeholder="Select Service"
                getOptionLabel={(branch) => branch.name}
                getOptionValue={(branch) => branch.code}
            />
        </div>
    );
}