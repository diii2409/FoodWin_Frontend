import {useSearchRestaurants} from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, {SearchForm} from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropDown from "@/components/SortOptionDropDown";
import {useState} from "react";
import {useParams} from "react-router-dom";

export type SearchState = {
	searchQuery: string;
	page: number;
	selectedCuisines?: string[];
	sortOption?: string;
};

export default function SearchPage() {
	const {city} = useParams();
	const [searchState, setSearchState] = useState<SearchState>({
		searchQuery: "",
		page: 1,
		selectedCuisines: [],
		sortOption: "bestMatch",
	});
	const {results} = useSearchRestaurants(searchState, city);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const setPage = (page: number) => {
		setSearchState(prevState => ({
			...prevState,
			page,
		}));
	};

	const setSelectedCuisines = (cuisines: string[]) => {
		setSearchState(prevState => ({
			...prevState,
			selectedCuisines: cuisines,
			page: 1,
		}));
	};

	const setSearchQuery = (searchFormData: SearchForm) => {
		setSearchState(prevState => ({
			...prevState,
			searchQuery: searchFormData.searchQuery,
		}));
	};

	const resetSearch = () => {
		setSearchState(prevState => ({
			...prevState,
			searchQuery: "",
			page: 1,
		}));
	};

	const setSortOption = (sortOption: string) => {
		setSearchState(prevState => ({
			...prevState,
			sortOption,
			page: 1,
		}));
	};

	if (!results?.data || !city) {
		return <div>No results found</div>;
	}

	return (
		<div className={"grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5"}>
			<div id="cuisines-list">
				<CuisineFilter
					selectedCuisines={searchState.selectedCuisines || []}
					onChange={setSelectedCuisines}
					isExpanded={isExpanded}
					onExpandedClick={() => setIsExpanded(!isExpanded)}
				/>
			</div>
			<div id="main-content" className="flex flex-col gap-5">
				<SearchBar
					searchQuery={searchState.searchQuery}
					onSubmit={setSearchQuery}
					placeHolder="Search by Cuisine or Restaurant Name"
					onReset={resetSearch}
				/>

				<div className="flex justify-between flex-col gap-3 lg:flex-row">
					<SearchResultInfo total={results.pagination.total} city={city} />
					<SortOptionDropDown
						sortOption={searchState.sortOption}
						onChange={value => setSortOption(value)}
					/>
				</div>
				{results.data.map((restaurant, index) => (
					<SearchResultCard key={index} restaurant={restaurant} />
				))}

				<div className="my-4">
					<PaginationSelector
						page={results.pagination.page}
						pages={results.pagination.pages}
						onPageChange={setPage}
					/>
				</div>
			</div>
		</div>
	);
}
