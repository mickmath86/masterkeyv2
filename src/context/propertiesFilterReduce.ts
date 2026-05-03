import { allProperties } from "@/data/properties";

export type PropertiesFilterState = {
    bedrooms: string;
    bathrooms: string;
    garages: string;
    city: string;
    type: string;
    budget: string;
    minSize: string;
    maxSize: string;
    features: string[];
    filtered: typeof allProperties;
    sortingOption: string;
    sorted: typeof allProperties;
    currentPage: number;
    itemPerPage: number;
};

export type PropertiesFilterAction =
    | { type: "SET_BEDROOMS"; payload: string }
    | { type: "SET_BATHROOMS"; payload: string }
    | { type: "SET_GARAGES"; payload: string }
    | { type: "SET_CITY"; payload: string }
    | { type: "SET_TYPE"; payload: string }
    | { type: "SET_BUDGET"; payload: string }
    | { type: "SET_MINSIZE"; payload: string }
    | { type: "SET_MAXSIZE"; payload: string }
    | { type: "SET_FEATURES"; payload: string[] }
    | { type: "SET_FILTERED"; payload: typeof allProperties }
    | { type: "SET_SORTING_OPTION"; payload: string }
    | { type: "SET_SORTED"; payload: typeof allProperties }
    | { type: "SET_CURRENT_PAGE"; payload: number }
    | { type: "SET_ITEM_PER_PAGE"; payload: number }
    | { type: "CLEAR_FILTER" };

export const initialState: PropertiesFilterState = {
    bedrooms: "Any Bedrooms",
    bathrooms: "Any Bathrooms",
    garages: "Any Garages",
    city: "All Cities",
    budget: "Max. Price",
    type: "Any Type",
    maxSize: "Max (SqFt)",
    minSize: "Min (SqFt)",
    features: [],
    filtered: allProperties,
    sortingOption: "Sort by (Default)",
    sorted: allProperties,
    currentPage: 1,
    itemPerPage: 9,
};

export function reducer(
    state: PropertiesFilterState,
    action: PropertiesFilterAction
): PropertiesFilterState {
    switch (action.type) {
        case "SET_BEDROOMS":
            return { ...state, bedrooms: action.payload };
        case "SET_BATHROOMS":
            return { ...state, bathrooms: action.payload };
        case "SET_GARAGES":
            return { ...state, garages: action.payload };
        case "SET_TYPE":
            return { ...state, type: action.payload };
        case "SET_CITY":
            return { ...state, city: action.payload };
        case "SET_BUDGET":
            return { ...state, budget: action.payload };
        case "SET_MAXSIZE":
            return { ...state, maxSize: action.payload };
        case "SET_MINSIZE":
            return { ...state, minSize: action.payload };
        case "SET_FEATURES":
            return { ...state, features: action.payload };
        case "SET_FILTERED":
            return { ...state, filtered: [...action.payload] };
        case "SET_SORTING_OPTION":
            return { ...state, sortingOption: action.payload };
        case "SET_SORTED":
            return { ...state, sorted: [...action.payload] };
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.payload };
        case "SET_ITEM_PER_PAGE":
            return { ...state, itemPerPage: action.payload };
        default:
            return state;
    }
}
