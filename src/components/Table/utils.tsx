import {SortDirection} from '@tanstack/react-table'
import { ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';

export const SorterIcon = ({ isSorted }: { isSorted: SortDirection | false }) => {
    if (isSorted === "asc") {
        return <ChevronDown className="h-4 w-4" />
    } else if (isSorted === "desc") {
      return <ChevronUp className="h-4 w-4" />;
    } else {
      return <ArrowUpDown className="h-4 w-4" />;
    }
  };