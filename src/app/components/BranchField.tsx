import { useState } from "react";
import SearchableDropdown from "./SearchableDropdown";

interface Branch {
  code: string;
  name: string;
}

const branchOptions: Branch[] = [
  { code: "NYC", name: "New York" },
  { code: "LAX", name: "Los Angeles" },
  { code: "CHI", name: "Chicago" },
  { code: "HOU", name: "Houston" },
  { code: "MIA", name: "Miami" },
];

export default function BranchField() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const handleBranchSelect = (branch: Branch | null) => {
    setSelectedBranch(branch);
  };

  return (
    <div className="p-4">
      <SearchableDropdown
        options={branchOptions} // Pass the branch list
        value={selectedBranch}
        onChange={handleBranchSelect}
        placeholder="Select Branch"
        getOptionLabel={(branch) => branch.name} // Ensure labels are properly displayed
        getOptionValue={(branch) => branch.code} // Ensure selection works correctly
      />
    </div>
  );
}
