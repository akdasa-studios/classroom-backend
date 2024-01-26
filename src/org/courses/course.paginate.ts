import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate'
import { Course } from './entities/course.entity'

export const CoursePaginateConfig: PaginateConfig<Course> = {
  sortableColumns: ['id', 'title'],
  nullSort: 'last',
  defaultSortBy: [['title', 'DESC']],
  searchableColumns: ['title', 'summary'],
  select: ['id', 'title', 'summary', 'coverUrl'],
  filterableColumns: {
    name: [FilterOperator.EQ, FilterOperator.ILIKE, FilterSuffix.NOT],
  },
}
