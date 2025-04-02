import { CaseHistoryEntry } from "@/types";

interface CaseHistoryProps {
  entries: CaseHistoryEntry[];
}

const CaseHistory = ({ entries }: CaseHistoryProps) => {
  const getUserBadgeStyle = (user: CaseHistoryEntry["user"]) => {
    switch (user) {
      case "System":
        return "bg-[var(--cms-info)] text-white";
      case "Agent":
        return "bg-[var(--cms-primary)] text-white";
      case "User":
        return "bg-[var(--cms-accent)] text-[var(--cms-dark)]";
      default:
        return "bg-[var(--cms-gray)] text-white";
    }
  };

  return (
    <div className="p-4 border border-[var(--cms-gray-light)] rounded bg-[var(--cms-gray-lighter)]">
      <h2 className="text-lg font-semibold mb-4">Case History</h2>

      {entries.length === 0 ? (
        <p className="text-[var(--cms-gray)] italic">No case history available</p>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="p-3 bg-white rounded shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{entry.action}</p>
                  <p className="text-sm text-[var(--cms-gray)]">{entry.date}</p>
                </div>
                <span
                  className={`inline-block py-1 px-2 rounded text-xs ${getUserBadgeStyle(
                    entry.user
                  )}`}
                >
                  {entry.user}
                </span>
              </div>
              {entry.notes && <p className="mt-2 text-sm">{entry.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CaseHistory;
