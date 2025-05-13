export interface IPaginationQuery {
	page: number;
	size: number;
	sort: string;
	order: string;
	search?: string;
}

export interface IPaginatedResultMeta {
	count: number;
	page?: number;
	pageCount?: number;
	size?: number;
	sort?: string;
	order?: string;
}

export interface IPaginatedResult<T> {
	items: Array<T>;
	meta: IPaginatedResultMeta;
}
